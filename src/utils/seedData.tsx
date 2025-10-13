// Seed data untuk demo
export async function seedDemoData() {
  // Check if demo user already exists
  const apiUrl = `https://${(window as any).__SUPABASE_PROJECT_ID__}.supabase.co/functions/v1/make-server-e056f5cc`;
  
  try {
    // Try to create demo user
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'demo@annual.com',
        password: 'demo123',
        name: 'Demo User',
      }),
    });

    if (response.ok) {
      console.log('Demo user created successfully');
      return true;
    } else {
      // User might already exist
      console.log('Demo user might already exist');
      return false;
    }
  } catch (error) {
    console.error('Error creating demo user:', error);
    return false;
  }
}
