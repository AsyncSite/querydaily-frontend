'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * GA 디버그 이벤트 타입
 */
interface DebugEvent {
  id: string;
  name: string;
  params: Record<string, any>;
  timestamp: number; // timestamp를 number로 변경
  category?: string;
}

/**
 * GA Debug Panel Component
 *
 * 개발 환경에서 GA 이벤트를 실시간으로 모니터링할 수 있는 디버그 패널입니다.
 * 프로덕션 환경에서는 자동으로 렌더링되지 않습니다.
 *
 * @example
 * ```tsx
 * // app/layout.tsx에 추가
 * import GADebugPanel from '@/lib/analytics/debug-panel';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <GADebugPanel />
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function GADebugPanel() {
  const [events, setEvents] = useState<DebugEvent[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);
  const eventIdCounter = useRef(0);
  const maxEvents = 30; // 최대 보관 이벤트 수

  useEffect(() => {
    // 프로덕션 환경에서는 실행하지 않음
    if (process.env.NODE_ENV !== 'development') return;

    // gtag 함수 인터셉트
    const originalGtag = window.gtag;

    if (!originalGtag) {
      console.warn('GA Debug Panel: gtag not found');
      return;
    }

    // gtag 래퍼 함수
    const wrappedGtag: Gtag.Gtag = function(...args: any[]) {
      // 원래 gtag 함수 호출
      originalGtag.apply(window, args as any);

      // 이벤트 캡처
      if (args[0] === 'event') {
        const eventName = args[1];
        const eventParams = args[2] || {};

        // 이벤트 카테고리 추출
        let category = 'general';
        if (eventName.includes('scroll')) category = 'engagement';
        else if (eventName.includes('click')) category = 'interaction';
        else if (eventName.includes('form')) category = 'form';
        else if (eventName.includes('error')) category = 'error';
        else if (eventName.includes('view')) category = 'content';
        else if (eventName.includes('purchase') || eventName.includes('checkout')) category = 'ecommerce';

        const debugEvent: DebugEvent = {
          id: `event_${++eventIdCounter.current}`,
          name: eventName,
          params: eventParams,
          timestamp: Date.now(),
          category,
        };

        setEvents(prev => {
          const updated = [debugEvent, ...prev];
          // 최대 개수 유지
          return updated.slice(0, maxEvents);
        });
      }
    };

    // gtag 함수 교체
    window.gtag = wrappedGtag as any;

    // 컴포넌트 언마운트 시 원래 함수로 복원
    return () => {
      window.gtag = originalGtag;
    };
  }, []);

  // 프로덕션 환경에서는 렌더링하지 않음
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // 숨김 상태
  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-black/90 text-white px-3 py-2 rounded-lg shadow-lg z-50 hover:bg-black transition-colors text-xs font-mono"
        title="GA 디버그 패널 열기"
      >
        📊 GA Debug
      </button>
    );
  }

  // 필터링된 이벤트
  const filteredEvents = filter
    ? events.filter(event =>
        event.name.toLowerCase().includes(filter.toLowerCase()) ||
        JSON.stringify(event.params).toLowerCase().includes(filter.toLowerCase())
      )
    : events;

  // 카테고리별 이벤트 수
  const eventCounts = events.reduce((acc, event) => {
    acc[event.category || 'other'] = (acc[event.category || 'other'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div
      className={`fixed ${
        isPinned ? 'bottom-4 right-4' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      } bg-black/95 text-white rounded-lg shadow-2xl z-50 font-mono text-xs transition-all ${
        isMinimized ? 'w-auto' : 'w-96 max-w-[90vw]'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">📊 GA Debug Panel</span>
            {events.length > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {events.length}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsPinned(!isPinned)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              title={isPinned ? 'Unpin' : 'Pin'}
            >
              {isPinned ? '📌' : '📍'}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? '➕' : '➖'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              title="Hide"
            >
              ✖️
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <>
          {/* Stats Bar */}
          <div className="bg-black/50 px-3 py-2 border-b border-white/10">
            <div className="flex gap-3 text-xs">
              <span className="text-green-400">✓ Connected</span>
              <span className="text-yellow-400">Events: {events.length}</span>
              {Object.entries(eventCounts).slice(0, 3).map(([cat, count]) => (
                <span key={cat} className="text-gray-400">
                  {cat}: {count}
                </span>
              ))}
            </div>
          </div>

          {/* Filter */}
          <div className="p-2 border-b border-white/10">
            <input
              type="text"
              placeholder="Filter events..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white/10 text-white px-2 py-1 rounded text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Events List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-2">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {filter ? 'No matching events' : 'Waiting for events...'}
              </div>
            ) : (
              filteredEvents.map((event) => (
                <EventItem key={event.id} event={event} />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="bg-black/50 px-3 py-2 border-t border-white/10 flex justify-between">
            <button
              onClick={() => setEvents([])}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
            <div className="text-xs text-gray-400">
              {/* 시간 표시 제거 - hydration 에러 방지 */}
              {events.length} events
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Individual Event Item Component
 */
function EventItem({ event }: { event: DebugEvent }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeString, setTimeString] = useState<string>('');

  // 클라이언트 사이드에서만 시간 포맷팅
  useEffect(() => {
    const date = new Date(event.timestamp);
    const formatted = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    setTimeString(formatted);
  }, [event.timestamp]);

  // 카테고리별 색상
  const categoryColors: Record<string, string> = {
    engagement: 'bg-blue-500',
    interaction: 'bg-green-500',
    form: 'bg-yellow-500',
    error: 'bg-red-500',
    content: 'bg-purple-500',
    ecommerce: 'bg-pink-500',
    general: 'bg-gray-500',
  };

  const bgColor = categoryColors[event.category || 'general'] || 'bg-gray-500';

  return (
    <div className="bg-white/5 rounded p-2 hover:bg-white/10 transition-colors">
      <div
        className="flex items-start gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Category Indicator */}
        <div className={`w-1 h-full ${bgColor} rounded-full mt-1`} />

        {/* Event Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-400">{event.name}</span>
            <span className="text-gray-500">{timeString || '...'}</span>
          </div>

          {/* Quick Preview */}
          {!isExpanded && Object.keys(event.params).length > 0 && (
            <div className="text-xs text-gray-400 mt-1 truncate">
              {Object.entries(event.params)
                .slice(0, 2)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ')}
              {Object.keys(event.params).length > 2 && '...'}
            </div>
          )}
        </div>

        {/* Expand Icon */}
        <div className="text-gray-400">
          {isExpanded ? '▼' : '▶'}
        </div>
      </div>

      {/* Expanded Parameters */}
      {isExpanded && (
        <div className="mt-2 ml-3 p-2 bg-black/30 rounded text-xs">
          {Object.entries(event.params).length === 0 ? (
            <span className="text-gray-500">No parameters</span>
          ) : (
            <table className="w-full">
              <tbody>
                {Object.entries(event.params).map(([key, value]) => (
                  <tr key={key} className="border-b border-white/5 last:border-0">
                    <td className="py-1 pr-2 text-gray-400 align-top">{key}:</td>
                    <td className="py-1 text-green-400 break-all">
                      {typeof value === 'object'
                        ? JSON.stringify(value, null, 2)
                        : String(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Simplified version for minimal resource usage
 */
export function GADebugBadge() {
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const originalGtag = window.gtag;
    if (!originalGtag) return;

    window.gtag = function(...args: any[]) {
      originalGtag.apply(window, args as any);
      if (args[0] === 'event') {
        setEventCount(prev => prev + 1);
      }
    } as any;

    return () => {
      window.gtag = originalGtag;
    };
  }, []);

  if (process.env.NODE_ENV !== 'development' || eventCount === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-mono z-50">
      GA: {eventCount}
    </div>
  );
}