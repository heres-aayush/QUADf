// src/app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import connectDB from '@/app/_middleware/mongodb';
import User from '@/app/_models/user_schema';
import { IUser } from '@/app/_models/user_schema';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const data = await req.json();
    console.log('Received data:', data); // Debug: log received data
    
    // Convert form values to expected schema values
    let userType;
    switch(data.userType) {
      case 'Commuter (Self)':
        userType = 'COMMUTER_SELF';
        break;
      case 'Commuter (Parent)':
        userType = 'COMMUTER_PARENT';
        break;
      case 'Driver':
        userType = 'DRIVER';
        break;
      case 'Agency':
        userType = 'AGENCY';
        break;
      default:
        userType = data.userType; // Keep original if none matched
    }
    
    // Validate user type after conversion
    const validUserTypes =  ['COMMUTER_SELF', 'COMMUTER_PARENT', 'DRIVER', 'AGENCY'];
    if (!userType || !validUserTypes.includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type: ' + data.userType },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!data.fullname || !data.email || !data.phone || !data.address || !data.password || !data.confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Confirm passwords match
    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Create user object with simplified fields
    const userData: Partial<IUser> = {
      userType,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: hashedPassword
    };
    
    const user = await User.create(userData);
    
    // Remove password from response
    const userResponse = user.toObject() as Record<string, any>;
    delete userResponse.password;

    return NextResponse.json(
      { 
        success: true,
        message: 'User created successfully', 
        user: userResponse 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error' 
      },
      { status: 500 }
    );
  }
}