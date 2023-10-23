"use client"

import { fetchPosts } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { PostCard } from '.';
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
    </section>
  )
}

export default Feed
