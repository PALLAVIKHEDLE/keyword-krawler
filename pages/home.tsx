import '../styles/globals.css'; // Import the global styles
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

export default function Page() {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="z-10 max-w-5xl  w-full items-center justify-between font-mono text-sm lg:flex">
    <div className="justify-center items-center lg:rounded-xl">
        <input
          type="text"
          placeholder="URL"
          style={{
            backgroundColor: 'white',
            border: 'none',
            outline: 'none',
            textAlign: 'center',
            width: '100%',
            padding: '12px',
          }}
        />
      </div>
    </div>
  </main>
  );
};