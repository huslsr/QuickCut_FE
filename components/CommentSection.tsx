"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/app/utils/dateFormatter";
import { useAuth } from "@/app/context/AuthProvider";
import {
  interactionService,
  Comment,
} from "@/app/api/services/interactionService";
import Link from "next/link";
import { getGuestId } from "@/app/utils/guestId";

export default function CommentSection({
  articleId,
  initialComments,
}: {
  articleId: string;
  initialComments?: Comment[];
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [loading, setLoading] = useState(initialComments === undefined);

  useEffect(() => {
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

    if (initialComments === undefined) {
      fetchComments();
    }
  }, [articleId, initialComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Use current user OR guest info
    const userId = user?.id || getGuestId();
    const username = user?.username || guestName || "Guest";

    try {
      const addedComment = await interactionService.addComment({
        articleId,
        userId: userId,
        username: username,
        content: newComment,
      });
      setComments([addedComment, ...comments]);
      setNewComment("");
      setGuestName("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  return (
    <div className="mt-12 border-t-4 border-black dark:border-gray-700 pt-8">
      <h3 className="text-2xl font-black font-serif mb-6 dark:text-white">
        Discussion
      </h3>

      <form onSubmit={handleSubmit} className="mb-8">
        {!user && (
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-400 mb-1">
              Name (Optional)
            </label>
            <input
              type="text"
              placeholder="Guest"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full max-w-sm px-4 py-2 border-2 border-gray-400 dark:border-gray-700 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-serif"
            />
          </div>
        )}
        <textarea
          className="w-full p-4 border-2 border-gray-400 dark:border-gray-700 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-600 dark:placeholder-gray-500 focus:border-black dark:focus:border-white focus:outline-none transition-colors font-serif resize-none"
          rows={4}
          placeholder={
            user
              ? "Share your perspective..."
              : "Share your perspective as a guest..."
          }
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="mt-2 flex justify-between items-center">
          {!user && (
            <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">
              Posting as {guestName || "Guest"}
            </p>
          )}
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-sm hover:bg-neutral-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto shadow-md"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500 italic">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-neutral-900 p-4 border-l-4 border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none"
            >
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-bold text-sm tracking-wide text-black dark:text-white">
                  {comment.username}
                </span>
                <span className="text-xs text-gray-600 font-mono dark:text-gray-400">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-800 dark:text-gray-300 font-serif leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic font-serif">
            No comments yet. Be the first to verify this story.
          </p>
        )}
      </div>
    </div>
  );
}
