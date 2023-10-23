"use client"

import { fetchPosts } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react'

const Feed = () => {

  // Searching and Loading related states
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  // Post related states
  const [allPosts, setAllPosts] = useState(Object);
  const [pageNo, setpageNo] = useState(0);
  const [nPages, setNPages] = useState(0);

  // Function to fetch posts
  const getPosts = async () => {
    setLoading(true);

    try{
      const result = await fetchPosts(searchText, pageNo);

      // Updating states
      setAllPosts(result);
      setpageNo(result.page);
      setNPages(result.nbPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Function to handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  // Fetching posts when searchText or pageNo changes
  useEffect(() => {
    getPosts();
  }, [searchText, pageNo]);


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'> 
        <input
          type='text'
          placeholder='Search stories by title, url or author'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {loading && (
        <div className='mt-16 w-full flex-center'>
          <Image
            src='/loader.svg'
            alt='loader'
            width={50}
            height={50}
            className='object-contain'
          />
        </div>
      )}
    </section>
  )
}

export default Feed
