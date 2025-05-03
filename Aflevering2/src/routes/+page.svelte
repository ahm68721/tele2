<script>
    import Input from '../lib/Input.svelte';
    import Button from '../lib/Button.svelte';
  
    let userName = '';
    let password = '';
  
    function btnClick() {
      if (userName === 'Nancy' && password === 'Kode') {
        alert('Login successful');
      } else {
        alert('Login failed');
      }
    }
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-base-200">
    <div class="bg-white p-8 rounded shadow-md w-80">
      <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>
  
      <Input bind:value={userName} placeholder="Brugernavn" />
      <Input bind:value={password} type="password" placeholder="Kodeord" />
  
      <Button onclick={btnClick}>
        Login
      </Button>
    </div>
  </div>
  