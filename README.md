# Notion CMS 기반 Next.js 블로그

## 🛠 기술 스택
- Next.js
- Notion (CMS)
- Notion API

---

## ❓ 만든 이유

노션은 글 쓰기가 정말 편하다.  
정리도 쉽고, 자동 저장도 되고, 글 쓰는 데 스트레스가 없다.

하지만 기존 블로그 서비스들은 문제가 있었다.

- UI가 불편함
- 사용법을 익히기 귀찮음
- 내가 원하는 디자인으로 커스터마이징이 안 됨

그래서 **글은 노션에서 편하게 쓰고**,  
**보여주는 건 내가 원하는 디자인의 블로그로 만들기 위해**  
이 프로젝트를 만들었다.

---

## 📌 핵심 컨셉
- 글 작성: Notion
- 렌더링: Next.js
- 방문자: 읽기 전용 블로그 UI

<img width="782" height="601" alt="스크린샷 2026-01-19 오전 11 17 35" src="https://github.com/user-attachments/assets/9834ce36-37f1-45ac-a8f1-ff841f08d5c3" />
<img width="837" height="155" alt="스크린샷 2026-01-19 오전 11 13 30" src="https://github.com/user-attachments/assets/b3be8e19-25a5-4bf6-8baf-4c6e1e2b8e8e" />

프로젝트 방향성과 사용자 흐름을 빠르게 검증하기 위해, 먼저 **데스크톱 기준의 초기 UI**를 설계했습니다.  
이 단계에서는 “기능 구현”보다 **정보 구조(IA)**, **시각적 위계**, **사용자 동선**을 우선으로 잡았습니다.

### Desktop UI 시안

<p align="center">
  <img width="1440" alt="Desktop - 2" src="https://github.com/user-attachments/assets/8fe00f49-17eb-43b5-a38b-0d6fa15b9dff" />
</p>

<p align="center">
  <img width="1440" alt="Desktop - 4" src="https://github.com/user-attachments/assets/0c64725a-f4f4-45fe-8cf9-89a9191f5615" />
</p>

### 설계 의도 (Design Notes)
- **핵심 정보 우선 배치**: 사용자가 첫 화면에서 바로 “무엇을 할 수 있는지” 이해하도록 구성  
- **명확한 시각적 위계**: 제목 → 주요 액션 → 상세 정보 순으로 흐름이 자연스럽게 내려가도록 설계  
- **확장 가능한 레이아웃**: 기능(필터/검색/정렬/상세 등)이 늘어나도 깨지지 않도록 영역을 분리
