# Contributing to Git Style

Git Style에 기여해 주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 개발 환경 설정

1. 저장소 Fork 및 Clone

```bash
git clone https://github.com/YOUR_USERNAME/git-style.git
cd git-style
```

2. 의존성 설치

```bash
pnpm install
```

3. 개발 서버 실행

```bash
pnpm dev
```

4. http://localhost:3000 에서 확인

## 기여 방법

### 버그 리포트

- [Issues](https://github.com/anonymousRecords/git-style/issues)에서 기존 이슈 확인
- 새 이슈 생성 시 버그 리포트 템플릿 사용
- 재현 가능한 단계와 환경 정보 포함

### 기능 제안

- Issue에서 기능 요청 템플릿 사용
- 기능의 목적과 예상 동작 설명

### Pull Request

1. `main` 브랜치에서 새 브랜치 생성

```bash
git checkout -b feature/your-feature-name
```

2. 코드 작성 및 린트 확인

```bash
pnpm lint
```

3. 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가
chore: 빌드, 설정 변경
```

4. Push 및 PR 생성

```bash
git push origin feature/your-feature-name
```

## 새 테마 추가하기

Git Style의 핵심 기능은 테마입니다. 새 테마를 추가하려면:

1. `/lib/themes/` 디렉토리에 새 폴더 생성
2. 다음 파일 구현:
   - `server-render.ts` - SVG 렌더링 로직
   - `client-preview.ts` - 클라이언트 미리보기
   - `index.ts` - export
3. `/lib/themes/index.ts`에 테마 등록
4. `/components/theme-selector/`에 선택 UI 추가

## 코드 스타일

- TypeScript strict 모드 준수
- Biome 린터/포맷터 사용
- 컴포넌트는 함수형으로 작성

## 질문이 있으신가요?

Issue를 생성하거나 [Discussion](https://github.com/anonymousRecords/git-style/discussions)에서 질문해 주세요.
