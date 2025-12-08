'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/app/utils/dateFormatter';
import { useAuth } from '@/app/context/AuthProvider';
import { interactionService, Comment } from '@/app/api/services/interactionService';
import Link from 'next/link';

export default function CommentSection({ articleId }: { articleId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
        const data = await interactionService.getComments(articleId);
        setComments(data);
    } catch (err) {
        console.error("Failed to fetch comments", err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      const addedComment = await interactionService.addComment({
        articleId,
        userId: user.id || '', // fallback if id missing, but should be there
        username: user.username,
        content: newComment
      });
      setComments([addedComment, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  return (
    <div className="mt-12 border-t-4 border-black dark:border-gray-700 pt-8">
      <h3 className="text-2xl font-black font-serif mb-6 dark:text-white">Discussion</h3>

      {user ? (
      <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-500 focus:border-black dark:focus:border-white focus:outline-none transition-colors font-serif resize-none"
            rows={4}
            placeholder="Share your perspective..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-sm hover:bg-accent dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </div>
        </form>
      ) : (
          <div className="bg-gray-50 dark:bg-neutral-900 p-6 text-center mb-8 border border-gray-200 dark:border-gray-800">
          <p className="font-serif text-lg text-gray-600 dark:text-gray-300 mb-4">Join the conversation</p>
          <Link href={`/login?redirect=/article/${articleId}`} className="inline-block px-6 py-2 border-2 border-black dark:border-white font-bold uppercase tracking-wider text-sm hover:bg-black hover:text-white text-black dark:text-white dark:hover:bg-white dark:hover:text-black transition-all">
            Login to Comment
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
             <p className="text-gray-500 italic">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white dark:bg-neutral-900 p-4 border-l-4 border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-bold text-sm tracking-wide dark:text-white">{comment.username}</span>
                <span className="text-xs text-gray-400 font-mono dark:text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-800 dark:text-gray-300 font-serif leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic font-serif">No comments yet. Be the first to verify this story.</p>
        )}
      </div>
    </div>
  );
}
