'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');

  const post = {
    id: params.id,
    author: {
      name: '카카오 합격자',
      company: 'Kakao',
      avatar: '👨‍💻',
      followers: 245,
      isVerified: true
    },
    company: 'Kakao',
    title: '카카오 백엔드 2차 면접 후기',
    content: `오늘 카카오 백엔드 2차 면접을 봤습니다. 면접관 3분과 1시간 정도 진행됐어요.

**주요 질문들:**

1. Spring WebFlux를 사용해보신 적 있나요? Reactive Programming의 장단점은?
2. 대용량 트래픽 처리 경험이 있다면 어떻게 해결하셨나요?
3. Redis를 캐시로 사용할 때 주의할 점은?
4. MSA 환경에서 트랜잭션 관리는 어떻게 하시나요?

전반적으로 실무 경험을 중심으로 깊이있게 질문하셨고, 모르는 부분은 솔직하게 말씀드렸습니다.

면접 분위기는 매우 좋았고, 프로젝트에 대해 관심있게 들어주셔서 감사했습니다.`,
    tags: ['Spring', 'WebFlux', '백엔드', '카카오'],
    likes: 127,
    isLiked: false,
    timeAgo: '1시간 전'
  };

  const comments = [
    {
      id: 1,
      author: {
        name: '카카오 준비중',
        avatar: '👩‍💻'
      },
      content: '도움되는 정보 감사합니다! WebFlux 공부해야겠네요',
      likes: 12,
      timeAgo: '30분 전'
    },
    {
      id: 2,
      author: {
        name: '백엔드 개발자',
        avatar: '🧑‍💻'
      },
      content: 'MSA 트랜잭션 관리는 어떻게 답변하셨나요? 궁금합니다!',
      likes: 8,
      timeAgo: '45분 전'
    },
    {
      id: 3,
      author: {
        name: '네이버 재직자',
        avatar: '👨‍💻'
      },
      content: '좋은 결과 있으시길 바랍니다! 화이팅',
      likes: 5,
      timeAgo: '50분 전'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <Link href="/prototype8/feed" className="text-gray-600 text-sm">
          ← 뒤로
        </Link>
      </div>

      {/* Post Content */}
      <div className="bg-white px-6 py-6 border-b border-gray-200">
        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-2xl">
            {post.author.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{post.author.name}</span>
              {post.author.isVerified && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                  재직
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              팔로워 {post.author.followers} · {post.timeAgo}
            </div>
          </div>
          <button className="px-4 py-1.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
            팔로우
          </button>
        </div>

        {/* Company Tag */}
        <div className="mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            {post.company}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Content */}
        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line mb-4">
          {post.content}
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            <span className={liked ? 'text-red-500' : ''}>{liked ? '❤️' : '🤍'}</span>
            <span className="font-medium">{liked ? post.likes + 1 : post.likes}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-700">
            <span>💬</span>
            <span className="font-medium">{comments.length}</span>
          </div>
          <button className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors ml-auto">
            <span>🔗</span>
            <span className="text-sm">공유</span>
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white mt-2">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">댓글 {comments.length}</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {comments.map((comment) => (
            <div key={comment.id} className="px-6 py-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {comment.author.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {comment.timeAgo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <button className="hover:text-orange-600">❤️ {comment.likes}</button>
                    <button className="hover:text-orange-600">답글</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
            />
            <button className="px-6 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors">
              작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
