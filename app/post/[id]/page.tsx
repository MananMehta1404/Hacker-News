"use client"

import { CommentProps } from '@/types';
import { fetchPostDetails } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'

const PostDetails = ({ params }: { params: { id: string } }) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(Object);

    // Get post details
    const getPosts = async () => {
        setLoading(true);
    
        try{
          const result = await fetchPostDetails(params.id);

          setPost(result);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
    }

    // Convert text to a better readable format
    const convertText = (text: string) => {
        const div = document.createElement('div');
        div.innerHTML = text;
        const decodedText = div.innerText;

        return decodedText;
    }

    // Convert date to a better readable format
    const convertDate = (time: string) => {
      const date = new Date(time);

      return date.toLocaleDateString();
    }

    useEffect(() => {
        getPosts();
    }, [params.id]);

    // Destructuring the post
    const [title, url, author, time, points] = [post.title, post.url, post.author, post.created_at, post.points];

    // An array of type CommentProps
    const children: CommentProps[] = post.children;

    return (
        <div className='flex flex-col w-full'>

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

          {/* Post */}
          {url && (
            <>
              {/* Title */}
              <div className='font-bold text-lg'>
                {title} <Link href={url} className='text-gray-500 text-sm'> {`(${url})`} </Link>
              </div>

              {/* More info */}
              <div className='text-sm'>
                <span className='mr-3'>{points} points by {(author)} on {convertDate(time)}</span>
                <span className='mr-3'>|</span>
                <span className='mr-3'>{children?.length} comments</span>
              </div>

              {/* Comments */}
              <div className='home__cars-wrapper mb-10'>
                {children?.map((child: CommentProps) => (
                  <div className='relative flex flex-col flex-wrap w-full rounded-lg bg-white shadow-md mt-5 p-3 text-sm'>
                    <div className='font-bold mb-3 text-gray-600'>{`> ${child.author} on ${convertDate(child.created_at)}`}</div>
                    <div className='ml-3'>
                      {convertText(child.text)}
                    </div>
                  </div>
                ))}
              </div>
            </> 
          )}

          {/* Scroll Up */}
          <Link href={`/post/${params.id}`} className='top'>
            <Image
              src='/scroll.png'
              alt="Scroll Up"
              width={50}
              height={50}
            >
            </Image>
          </Link>

        </div>
    )
}

export default PostDetails