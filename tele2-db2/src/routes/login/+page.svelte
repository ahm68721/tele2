<script>
    import Input from '../../lib/Input.svelte';
    import Button from '../../lib/Button.svelte';
    import { goto } from '$app/navigation';
  
    let userName = '';
    let password = '';
  
    const login = async () => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userName, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Login successful');
        goto('/admin');
      } else {
        alert('Login failed');
      }
    };
  
    // Testfunktion til at oprette testbruger direkte
    const testUser = async () => {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'test1234'
        })
      });
  
      const result = await response.json();
      alert(JSON.stringify(result));
    };
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-base-200">
    <div class="bg-white p-8 rounded shadow-md w-80">
      <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>
  
      <Input bind:value={userName} placeholder="Brugernavn" />
      <Input bind:value={password} type="password" placeholder="Kodeord" />
  
      <Button on:click={login}>
        Login
      </Button>
  
      <div class="mt-4">
        <Button on:click={testUser} class="btn-secondary">
          Opret testbruger
        </Button>
      </div>
    </div>
  </div>
  