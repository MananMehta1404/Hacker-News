"use client"

import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react'

import { PostCard } from '.';
import { fetchPosts } from '@/utils';
import { PostProps } from '@/types';

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

  // Function to handle pagination
  const handleOnPrevClick = () => {
    setpageNo(pageNo - 1);
  }

  // Function to handle pagination
  const handleOnNextClick = () => {
    setpageNo(pageNo + 1);
  }

  // Fetching posts when searchText or pageNo changes
  useEffect(() => {
    getPosts();
  }, [searchText, pageNo]);


  return (
    <section className='feed'>
      {/* Search */}
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

      {/* Loading */}
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

      {/* Posts */}
      {allPosts.hits?.length > 0 ? (
        <section>
          <div className='home__cars-wrapper mb-10'>
            {allPosts.hits?.map((post: PostProps) => (
              <PostCard post={post} key={post.objectID} />
            ))}
          </div>
        </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>
            {!allPosts && (
              <div className='mt-16 w-full flex-center'>
                No posts found.
              </div>
            )}
            </h2>
          </div>
        )}

      {/* Pagination */}
      {allPosts.hits?.length > 0 && (
          <div className='flex justify-center items-center flex-row mb-10'>
            {pageNo != 0 && (
              <button onClick={handleOnPrevClick} className='m-4 py-1 px-4 rounded-md bg-red-200'> 
                <Link href='/'>Prev</Link> 
              </button>
            )}
              {pageNo + 1} of {nPages}
            {pageNo != nPages - 1 && (
              <button onClick={handleOnNextClick} className='m-4 py-1 px-4 rounded-md bg-red-200'>
                <Link href='/'>Next</Link> 
              </button>)}
          </div>
        )}

        {/* Scroll Up */}
        <Link href={'/'} className='top'>
          <Image
            src='/scroll.png'
            alt="Scroll Up"
            width={50}
            height={50}
          >
          </Image>
        </Link>

    </section>
  )
}

export default Feed
