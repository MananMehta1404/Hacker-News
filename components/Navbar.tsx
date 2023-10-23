import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src="/logo.svg"
          alt="Hacker News Logo"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Hacker News</p>
      </Link>
      <div className='flex gap-6'>
        <Link href='/' className='mt-1'>Home</Link>
        <button className='py-1 px-4 rounded-md bg-red-200'>Log In</button>
        <button className='py-1 px-4 rounded-md bg-red-200'>Sign Up</button>
      </div>
    </nav>
  )
}

export default Navbar