import { PostProps } from '@/types'
import Link from 'next/link';
import React from 'react'

interface PostCardProps {
  post: PostProps
}

const PostCard = ({ post }: PostCardProps) => {
  const { author, num_comments, points, url, title, objectID } = post;

  if(!title || !url) return null;

  return (
    <div className='relative flex flex-col flex-wrap w-full rounded-lg bg-white shadow-md mt-5 p-3'>
      <div className='m-2 font-bold'>
        <Link href={`/post/${objectID}`}><span className="cursor-pointer absolute" />{title}</Link>
      </div>

      <div className='m-2 text-sm'>
        {url && <Link href={url}><span className="cursor-pointer absolute" />{url}</Link>}
      </div>
      
      <div className='m-2 text-sm'>
        <span className='mr-3'>{author}</span>|<span className='mr-3 ml-3'>{num_comments} comments</span>|<span className='mr-3 ml-3'>{points} points</span>
      </div>
      
    </div>
  )
}

export default PostCard
