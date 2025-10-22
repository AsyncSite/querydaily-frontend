'use client';

import Link from 'next/link';
import { copyVariations } from '@/lib/copyConfig';

export default function LandingIndex() {
  const versions = Object.entries(copyVariations);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1f2e 0%, #252b3b 100%)',
      padding: '4rem 2rem',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🎯 Query Daily 카피 테스트 대시보드
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#a0aec0', marginBottom: '2rem' }}>
            같은 디자인, 다른 설득 포인트로 7가지 버전을 만들었습니다.<br />
            각 버전을 클릭해서 카피의 차이를 확인하세요.
          </p>
          <div style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'rgba(255,215,0,0.1)',
            border: '2px solid rgba(255,215,0,0.3)',
            borderRadius: '12px',
            color: '#ffd700'
          }}>
            💡 <strong>핵심:</strong> 모든 페이지가 같은 CSS를 사용합니다. 카피(문구)만 다릅니다.
          </div>
        </div>

        {/* Copy Variations Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {versions.map(([key, config]) => (
            <Link
              key={key}
              href={`/landing/${key}`}
              style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(74,158,255,0.5)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(74,158,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: getColorForVersion(key),
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {config.version}
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>
                {config.heroTitle.main}
              </h3>
              <p style={{ fontSize: '1.2rem', color: '#ffd700', marginBottom: '1rem', fontWeight: 'bold' }}>
                {config.heroTitle.highlight}
              </p>

              <p style={{ color: '#a0aec0', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {config.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                padding: '1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#4a9eff' }}>{config.heroStats.stat1.number}</div>
                  <div style={{ color: '#718096', fontSize: '0.75rem' }} dangerouslySetInnerHTML={{ __html: config.heroStats.stat1.label.replace('<br/>', ' ') }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#4a9eff' }}>{config.heroStats.stat2.number}</div>
                  <div style={{ color: '#718096', fontSize: '0.75rem' }} dangerouslySetInnerHTML={{ __html: config.heroStats.stat2.label.replace('<br/>', ' ') }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#4a9eff' }}>{config.heroStats.stat3.number}</div>
                  <div style={{ color: '#718096', fontSize: '0.75rem' }} dangerouslySetInnerHTML={{ __html: config.heroStats.stat3.label.replace('<br/>', ' ') }} />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <span style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #4a9eff, #667eea)',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}>
                  {config.ctaButton} →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Persuasion Framework */}
        <div style={{
          padding: '3rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          border: '2px solid rgba(255,255,255,0.1)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
            📚 10가지 설득 포인트 프레임워크
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <PersuasionPoint icon="💰" title="돈을 번다" desc="연봉 상승, 수익 증가" version="earn-money" />
            <PersuasionPoint icon="💸" title="돈을 아낀다" desc="비용 절감, 무료 혜택" version="save-money" />
            <PersuasionPoint icon="⚡" title="시간을 아낀다" desc="효율성, 자동화" version="save-time" />
            <PersuasionPoint icon="🛡️" title="고통에서 벗어난다" desc="불안 해소, 스트레스 감소" version="avoid-pain" />
            <PersuasionPoint icon="☁️" title="편안해진다" desc="편의성, 쉬움" version="comfort" />
            <PersuasionPoint icon="⭐" title="칭찬받는다" desc="인정, 칭찬" version="praise" />
            <PersuasionPoint icon="👑" title="사회적 지위" desc="대기업, 인정" version="social-status" />
            <PersuasionPoint icon="🏥" title="건강/위생" desc="(미구현)" version="" />
            <PersuasionPoint icon="💝" title="사랑받는다" desc="(미구현)" version="" />
            <PersuasionPoint icon="🎉" title="인기/지위" desc="(미구현)" version="" />
          </div>
        </div>

        {/* Back to main */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link
            href="/"
            style={{
              padding: '1rem 2rem',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              color: 'white',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            ← 메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

function PersuasionPoint({ icon, title, desc, version }: { icon: string; title: string; desc: string; version: string }) {
  const isImplemented = version !== '';

  return (
    <div style={{
      padding: '1.5rem',
      background: isImplemented ? 'rgba(74,158,255,0.1)' : 'rgba(255,255,255,0.03)',
      borderRadius: '12px',
      border: isImplemented ? '2px solid rgba(74,158,255,0.3)' : '2px solid rgba(255,255,255,0.05)',
      opacity: isImplemented ? 1 : 0.5
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#a0aec0', marginBottom: '0.5rem' }}>{desc}</p>
      {isImplemented && (
        <Link
          href={`/landing/${version}`}
          style={{
            fontSize: '0.8rem',
            color: '#4a9eff',
            textDecoration: 'none'
          }}
        >
          보러가기 →
        </Link>
      )}
    </div>
  );
}

function getColorForVersion(key: string): string {
  const colors: Record<string, string> = {
    'earn-money': 'linear-gradient(135deg, #ffd700, #ffa500)',
    'save-time': 'linear-gradient(135deg, #11998e, #38ef7d)',
    'avoid-pain': 'linear-gradient(135deg, #667eea, #764ba2)',
    'social-status': 'linear-gradient(135deg, #f093fb, #f5576c)',
    'save-money': 'linear-gradient(135deg, #56ab2f, #a8e063)',
    'comfort': 'linear-gradient(135deg, #89f7fe, #66a6ff)',
    'praise': 'linear-gradient(135deg, #fa709a, #fee140)',
  };
  return colors[key] || 'linear-gradient(135deg, #4a9eff, #667eea)';
}
