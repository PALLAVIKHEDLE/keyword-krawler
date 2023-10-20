import '../styles/globals.css'; // Import the global styles
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

export default function Page() {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
    <div className="w-full font-mono text-sm lg:flex">
      <div className="mx-auto bg-white rounded-full border flex" style={{ width: '50%', justifyContent: 'space-between', marginBottom: '25%' }}>
        <input
          type="text"
          placeholder="Paste URL here..."
          className="bg-white border-none outline-none text-black px-4 py-2 rounded-full"
          style={{width:'100%'}}
        />
      
        <span className="text-black text-lg bg-white px-4 py-2 rounded-full" style={{ fontSize: 25 }}>
          &rarr;
        </span>
      </div>
    </div>
  </main>
  );
};