'use client';

import { useRouter } from 'next/navigation';
import { ThemeProvider } from '../ThemeContext';
import '../globals.css';

function ProductsPageContent() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        padding: '0.8rem 1.5rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="/prototype-hyundoo/v5" style={{
            fontSize: '1.4rem',
            fontWeight: '800',
            color: 'var(--color-text-primary)',
            textDecoration: 'none'
          }}>
            Query<span style={{color: 'var(--color-secondary)'}}>Daily</span>
          </a>

          <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <a href="/prototype-hyundoo/v5/products" style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: 'var(--color-secondary)',
              textDecoration: 'none'
            }}>
              상품
            </a>
            <a href="/prototype-hyundoo/v5#products" style={{
              padding: '0.6rem 1.2rem',
              background: 'linear-gradient(135deg, #dc2626, #9333ea)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.9rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
            }}>
              시작하기
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        paddingTop: '120px',
        paddingBottom: '4rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)'
      }}>
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem'}}>
          <span style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(220, 38, 38, 0.1)',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--color-secondary)',
            marginBottom: '1.5rem'
          }}>
            상품 안내
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            lineHeight: '1.3',
            marginBottom: '1rem'
          }}>
            당신에게 맞는 플랜을<br/>
            <span style={{color: 'var(--color-secondary)'}}>선택하세요</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.8'
          }}>
            이력서 기반 맞춤 면접 질문으로<br/>
            체계적인 면접 준비를 시작하세요
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{
        padding: '3rem 1.5rem 5rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {/* Growth Plan Card */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
            border: '2px solid var(--color-secondary)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Featured Badge */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.4rem 0.8rem',
              background: 'var(--color-secondary)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: '700',
              borderRadius: '20px',
              textTransform: 'uppercase'
            }}>
              MOST POPULAR
            </div>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              marginBottom: '0.5rem',
              color: 'var(--color-secondary)'
            }}>
              그로스 플랜
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '1.5rem'
            }}>
              20일 집중 훈련, 40개 맞춤 질문
            </p>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(220, 38, 38, 0.05)',
              borderRadius: '16px',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.8',
                margin: 0
              }}>
                빅테크·유니콘 출신 시니어 개발자가 직접 검수한 질문으로<br/>
                <strong>꼬리질문까지 완벽 대비</strong>할 수 있습니다.
              </p>
            </div>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2rem 0'
            }}>
              {[
                '하루 2개 질문, 20일 완성 커리큘럼',
                '이력서 기반 AI 맞춤 질문 생성',
                'STAR 기법 기반 답변 가이드',
                '질문당 3개 꼬리질문으로 심층 대비'
              ].map((feature, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '0.8rem',
                  fontSize: '0.95rem'
                }}>
                  <span style={{color: 'var(--color-secondary)', fontWeight: '700'}}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <span style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'var(--color-secondary)'
              }}>₩49,000</span>
              <span style={{
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'line-through'
              }}>₩106,000</span>
            </div>

            <button
              onClick={() => router.push('/prototype-hyundoo/v4/products/growth-plan/v2')}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #dc2626, #9333ea)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '1rem',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
              }}
            >
              상세보기 →
            </button>

            <p style={{
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              하루 2,450원, 커피 한 잔 값으로 면접 준비 끝
            </p>
          </div>

          {/* Critical Hit Card */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            {/* Badge */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.4rem 0.8rem',
              background: 'rgba(0, 0, 0, 0.05)',
              color: 'var(--color-text-secondary)',
              fontSize: '0.75rem',
              fontWeight: '600',
              borderRadius: '20px'
            }}>
              빠른 경험
            </div>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              marginBottom: '0.5rem'
            }}>
              크리티컬 히트
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '1.5rem'
            }}>
              내일 면접이어도 준비할 수 있어요
            </p>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(0, 0, 0, 0.02)',
              borderRadius: '16px',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.8',
                margin: 0
              }}>
                가장 많이 나오는 핵심 3가지.<br/>
                <strong>오늘 준비하면, 내일 자신있게 답할 수 있어요.</strong>
              </p>
            </div>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2rem 0'
            }}>
              {[
                '당신 이력서에서 가장 중요한 질문 3개',
                '어떻게 답할지 막막하지 않게, 답변 틀 제공',
                '결제하면 24시간 내, 빠르게 준비 시작'
              ].map((feature, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '0.8rem',
                  fontSize: '0.95rem'
                }}>
                  <span style={{opacity: 0.5}}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
              <li style={{height: '1.6rem'}}></li>
            </ul>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <span style={{
                fontSize: '2.5rem',
                fontWeight: '800'
              }}>₩9,900</span>
              <span style={{
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'line-through'
              }}>₩15,900</span>
            </div>

            <button
              onClick={() => router.push('/prototype-hyundoo/v4/products/critical-hit')}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #6b7280, #374151)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
              }}
            >
              상세보기 →
            </button>

            <p style={{
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              급할수록 핵심만 정확하게
            </p>
          </div>
        </div>

        {/* Plan Comparison */}
        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'rgba(220, 38, 38, 0.03)',
          borderRadius: '24px'
        }}>
          <h3 style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '2rem'
          }}>
            어떤 플랜이 나에게 맞을까?
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* 그로스 플랜 추천 */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(220, 38, 38, 0.08)',
              borderRadius: '16px',
              borderLeft: '4px solid var(--color-secondary)'
            }}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--color-secondary)',
                marginBottom: '1rem'
              }}>
                그로스 플랜 추천
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: '2'
              }}>
                <li>✓ 면접까지 <strong>1주일 이상</strong> 여유</li>
                <li>✓ <strong>모든 질문</strong> 빠짐없이 준비</li>
                <li>✓ 꼬리 질문까지 <strong>완벽 대비</strong></li>
                <li>✓ 이번 이직이 <strong>정말 중요</strong>한 분</li>
              </ul>
            </div>

            {/* 크리티컬 히트 추천 */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0, 0, 0, 0.03)',
              borderRadius: '16px',
              borderLeft: '4px solid var(--color-text-muted)'
            }}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}>
                크리티컬 히트 추천
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: '2'
              }}>
                <li>• 면접이 <strong>3일 이내</strong>로 급한 분</li>
                <li>• <strong>먼저 경험</strong>해보고 싶은 분</li>
                <li>• 핵심 <strong>3개만</strong> 빠르게</li>
              </ul>
            </div>
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(220, 38, 38, 0.1)',
            borderRadius: '12px',
            fontSize: '0.95rem'
          }}>
            <span style={{opacity: 0.7}}>고민된다면?</span>{' '}
            <strong style={{color: 'var(--color-secondary)'}}>그로스 플랜</strong>을 추천드립니다.<br/>
            <span style={{fontSize: '0.85rem', opacity: 0.6}}>제대로 준비해서 한 번에 붙는 게 결국 더 빠릅니다.</span>
          </p>
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '4rem',
          textAlign: 'center',
          padding: '3rem 2rem',
          background: 'linear-gradient(135deg, #dc2626, #9333ea)',
          borderRadius: '24px',
          color: '#fff'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            marginBottom: '1rem'
          }}>
            면접 준비, 지금 시작하세요
          </h3>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            marginBottom: '2rem',
            lineHeight: '1.8'
          }}>
            당신 이력서에서 나올 질문,<br/>
            미리 알고 준비하면 달라집니다.
          </p>
          <a
            href="/prototype-hyundoo/v5#products"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: '#fff',
              color: 'var(--color-secondary)',
              fontWeight: '700',
              fontSize: '1.1rem',
              borderRadius: '12px',
              textDecoration: 'none'
            }}
          >
            지금 시작하기 →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)'
          }}>
            © 2025 QueryDaily. All rights reserved.
          </p>
          <p style={{
            margin: 0,
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)'
          }}>
            사업자등록번호: 456-12-02771 | 대표: 어싱크사이트
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <ThemeProvider>
      <ProductsPageContent />
    </ThemeProvider>
  );
}