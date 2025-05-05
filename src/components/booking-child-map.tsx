"use client"

import { useEffect, useRef, useState } from "react"

interface BookingChildMapProps {
  pickupLocation?: string
  destination?: string
}

export function BookingChildMap({ pickupLocation, destination }: BookingChildMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [platform, setPlatform] = useState<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [pickupMarker, setPickupMarker] = useState<any>(null)
  const [destinationMarker, setDestinationMarker] = useState<any>(null)
  const [routeLine, setRouteLine] = useState<any>(null)
  const [currentLocationMarker, setCurrentLocationMarker] = useState<any>(null)
  const [locationWatchId, setLocationWatchId] = useState<number | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Load HERE Maps scripts
  useEffect(() => {
    const loadHereMaps = () => {
      const script = document.createElement('script')
      script.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js'
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        const script2 = document.createElement('script')
        script2.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js'
        document.body.appendChild(script2)

        script2.onload = () => {
          const script3 = document.createElement('script')
          script3.src = 'https://js.api.here.com/v3/3.1/mapsjs-ui.js'
          document.body.appendChild(script3)

          const script4 = document.createElement('script')
          script4.src = 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js'
          document.body.appendChild(script4)

          script4.onload = initializeMap
        }
      }
    }

    loadHereMaps()

    return () => {
      if (map) {
        map.dispose()
      }
    }
  }, [])

  // Initialize the map
  const initializeMap = () => {
    if (mapRef.current && (window as any).H) {
      const H = (window as any).H
      
      // Initialize the platform object
      const platform = new H.service.Platform({
        apikey: process.env.NEXT_PUBLIC_HERE_API_KEY
      })
      setPlatform(platform)

      // Get the default map types from the platform object
      const defaultLayers = platform.createDefaultLayers()

      // Instantiate the map
      const map = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: { lat: 12.9716, lng: 77.5946 }, // Default center (can be adjusted)
          zoom: 12,
          pixelRatio: window.devicePixelRatio || 1
        }
      )
      setMap(map)

      // Enable map interaction (pan, zoom, etc.)
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

      // Create the default UI components
      if (H.ui && H.ui.UI) {
        const ui = H.ui.UI.createDefault(map, defaultLayers)
      }

      // Make the map responsive
      window.addEventListener('resize', () => {
        map.getViewPort().resize()
      })

      setMapLoaded(true)
    }
  }

  // Update map when pickup or destination changes
  useEffect(() => {
    console.log("BookingChildMap useEffect triggered", { pickupLocation, destination });

    if (!mapLoaded) {
      console.log("BookingChildMap: Map not loaded yet");
      return;
    }
    if (!map) {
      console.log("BookingChildMap: Map object not available");
      return;
    }
    if (!platform) {
      console.log("BookingChildMap: Platform object not available");
      return;
    }
    if (!pickupLocation || !destination) {
      console.log("BookingChildMap: Pickup or destination location missing");
      // Clear previous markers and route if one location is cleared
      if (pickupMarker) map.removeObject(pickupMarker)
      if (destinationMarker) map.removeObject(destinationMarker)
      if (routeLine) map.removeObject(routeLine)
      setPickupMarker(null);
      setDestinationMarker(null);
      setRouteLine(null);
      return;
    }

    console.log("BookingChildMap: Proceeding with geocoding and routing...");

    const H = (window as any).H
    const geocodingService = platform.getSearchService()

    // Clear previous markers and route
    console.log("BookingChildMap: Clearing previous map objects");
    if (pickupMarker) map.removeObject(pickupMarker)
    if (destinationMarker) map.removeObject(destinationMarker)
    if (routeLine) map.removeObject(routeLine)
    setPickupMarker(null); // Reset state too
    setDestinationMarker(null);
    setRouteLine(null);

    // Geocode pickup location
    console.log(`BookingChildMap: Geocoding pickup: ${pickupLocation}`);
    geocodingService.geocode(
      { q: pickupLocation, limit: 1 },
      (pickupResult: any) => {
        console.log("BookingChildMap: Pickup geocoding result:", pickupResult);
        if (pickupResult.items && pickupResult.items.length > 0) {
          const pickupLocationData = pickupResult.items[0]
          const pickupPoint = {
            lat: pickupLocationData.position.lat,
            lng: pickupLocationData.position.lng
          }
          console.log(`BookingChildMap: Pickup location found at:`, pickupPoint);
          
          // Create pickup marker
          const newPickupMarker = new H.map.Marker(pickupPoint)
          map.addObject(newPickupMarker)
          setPickupMarker(newPickupMarker)
          console.log("BookingChildMap: Pickup marker added");

          // Now geocode destination
          console.log(`BookingChildMap: Geocoding destination: ${destination}`);
          geocodingService.geocode(
            { q: destination, limit: 1 },
            (destinationResult: any) => {
              console.log("BookingChildMap: Destination geocoding result:", destinationResult);
              if (destinationResult.items && destinationResult.items.length > 0) {
                const destinationLocationData = destinationResult.items[0]
                const destinationPoint = {
                  lat: destinationLocationData.position.lat,
                  lng: destinationLocationData.position.lng
                }
                console.log(`BookingChildMap: Destination location found at:`, destinationPoint);
                
                // Create destination marker
                const newDestinationMarker = new H.map.Marker(destinationPoint)
                map.addObject(newDestinationMarker)
                setDestinationMarker(newDestinationMarker)
                console.log("BookingChildMap: Destination marker added");

                // Calculate route between points
                console.log("BookingChildMap: Calculating route...");
                const routingService = platform.getRoutingService(null, 8)
                const routingParameters = {
                  'routingMode': 'fast',
                  'transportMode': 'car',
                  'origin': `${pickupPoint.lat},${pickupPoint.lng}`,
                  'destination': `${destinationPoint.lat},${destinationPoint.lng}`,
                  'return': 'polyline,summary'
                }
                console.log("BookingChildMap: Routing parameters:", routingParameters);

                routingService.calculateRoute(
                  routingParameters,
                  (routeResult: any) => {
                    console.log("BookingChildMap: Route calculation result:", routeResult);
                    if (routeResult.routes && routeResult.routes.length > 0) { 
                      const route = routeResult.routes[0]
                      console.log("BookingChildMap: Route found:", route);
                      
                      // Create a linestring to use as a route line
                      const lineString = H.geo.LineString.fromFlexiblePolyline(route.sections[0].polyline)
                      
                      // Create a polyline to display the route
                      const newRouteLine = new H.map.Polyline(lineString, {
                        style: { strokeColor: '#0077CC', lineWidth: 5 }
                      })

                      // Add the route polyline to the map
                      map.addObject(newRouteLine)
                      setRouteLine(newRouteLine)
                      console.log("BookingChildMap: Route line added to map");

                      // Set the map's viewport to make the whole route visible
                      try {
                        const bounds = newRouteLine.getBoundingBox();
                        if (bounds) {
                           console.log("BookingChildMap: Setting map viewport to bounds:", bounds);
                           map.getViewModel().setLookAtData({ bounds });
                        } else {
                           console.warn("BookingChildMap: Could not get bounds for route line, centering map instead.");
                           map.setCenter(pickupPoint); // Fallback centering
                           map.setZoom(12); // Fallback zoom
                        }
                      } catch(boundsError) {
                         console.error("BookingChildMap: Error setting map viewport:", boundsError);
                      }
                    } else {
                      console.warn("BookingChildMap: No routes found in the result.");
                    }
                  },
                  (error: any) => {
                    console.error('BookingChildMap: Route calculation error:', error)
                  }
                )
              } else {
                console.warn("BookingChildMap: No items found for destination geocoding.");
              }
            },
            (error: any) => {
              console.error('BookingChildMap: Destination geocoding error:', error)
            }
          )
        } else {
          console.warn("BookingChildMap: No items found for pickup geocoding.");
        }
      },
      (error: any) => {
        console.error('BookingChildMap: Pickup geocoding error:', error)
      }
    )
  }, [mapLoaded, map, platform, pickupLocation, destination])

  // Function to center map on current location
  const centerMapOnLocation = () => {
    if (!map || !platform) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const H = (window as any).H;
          const currentPoint = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // Remove previous marker if it exists
          if (currentLocationMarker) {
            map.removeObject(currentLocationMarker);
          }

          // Create a new marker for current location
          const newMarker = new H.map.Marker(currentPoint, {
            icon: new H.map.Icon('/current-location.png', { size: { w: 32, h: 32 } })
          });
          
          map.addObject(newMarker);
          setCurrentLocationMarker(newMarker);

          // Center map on current location
          map.setCenter(currentPoint);
          map.setZoom(15);

          // Start watching position for updates
          if (locationWatchId !== null) {
            navigator.geolocation.clearWatch(locationWatchId);
          }

          const watchId = navigator.geolocation.watchPosition(
            (updatedPosition) => {
              const updatedPoint = {
                lat: updatedPosition.coords.latitude,
                lng: updatedPosition.coords.longitude
              };

              // Update marker position
              if (currentLocationMarker) {
                currentLocationMarker.setGeometry(updatedPoint);
              }
            },
            (error) => {
              setLocationError(error.message);
              console.error('Location error:', error);
            },
            { enableHighAccuracy: true }
          );
          setLocationWatchId(watchId);
        },
        (error) => {
          setLocationError(error.message);
          console.error('Location error:', error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
    }
  };

  // Clean up location watch when component unmounts
  useEffect(() => {
    return () => {
      if (locationWatchId !== null) {
        navigator.geolocation.clearWatch(locationWatchId);
      }
    };
  }, [locationWatchId]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      <button
        onClick={centerMapOnLocation}
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        title="Center on my location"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      </button>
      {locationError && (
        <div className="absolute bottom-4 left-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-md">
          {locationError}
        </div>
      )}
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </div>
  )
}