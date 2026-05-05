const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';
const API_URL = process.env.API_URL || 'http://localhost:5000/api';

async function testProductionAPI() {
  try {
    console.log('\n🔐 Logging in as admin...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });
    
    if (!loginRes.ok) {
      console.log('❌ Admin login failed:', await loginRes.text());
      return;
    }

    const { token } = await loginRes.json();
    console.log('✅ Admin logged in\n');

    // Get admin stats    console.log('📊 Fetching admin stats...');
    const statsRes = await fetch(`${API_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!statsRes.ok) {
      console.log('❌ Failed to get stats:', await statsRes.text());
      return;
    }

    const stats = await statsRes.json();
    console.log('\n📊 DATABASE STATS:');
    console.log(`   Total Users: ${stats.totalUsers}`);
    console.log(`   Total Workers: ${stats.totalWorkers}`);
    console.log(`   Total Clients: ${stats.totalClients}`);
    console.log(`   Total Jobs: ${stats.totalJobs}`);
    console.log(`   Active Jobs: ${stats.activeJobs}\n`);

    // Get all workers
    console.log('👷 Fetching workers from /api/cleaners...');
    const workersRes = await fetch(`${API_URL}/cleaners`);
    const workers = await workersRes.json();
    console.log(` ${workers.length} workers with completed profiles\n`);

    if (workers.length > 0) {
      console.log('📋 First worker:');
      console.log(JSON.stringify(workers[0], null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testProductionAPI();
