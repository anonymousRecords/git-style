<div align="center">
  <img src="./doc.png" alt="Git Style Preview" width="300">
</div>

<br />

- [English](../README.md)
- [git-style.vercel.app](https://git-style.vercel.app)

<br />

> GitHub 커밋 기록을 아름답게 꾸며보세요. 당신만의 스타일로 커밋을 표현하세요.


## Usage

1. 테마와 스타일을 선택한다.
2. GitHub username을 입력한다.
3. 생성된 마크다운을 `README.md`에 붙여넣는다.


## Themes

| Theme | Status |
|-------|--------|
| Flower | Available |
| Hair | Available |
| Cloud | Soon |

### Flower

![Git Style](https://git-style.vercel.app/api/anonymousRecords/animation?flower=default&color=%23fbbf24)

꽃 종류와 색상을 커스터마이징할 수 있습니다.

**Types**: `default`(Daisy), `tulip`, `sunflower`, `cherry`

**Query Parameters**

| Param | Description | Default |
|-------|-------------|---------|
| `flower` | 꽃 종류 | `default` |
| `color` | HEX 색상 코드 | `#fbbf24` |

### Hair

![GitStyle](https://git-style.vercel.app/api/anonymousRecords/animation?theme=hair&quality=low&color=%233d2817&curliness=straight)

머리카락 색상과 곱슬거림을 커스터마이징할 수 있습니다.

**곱슬거림**: `straight`(직모), `wavy`(웨이브), `curly`(곱슬)

**Query Parameters**

| Param | Description | Default |
|-------|-------------|---------|
| `color` | HEX 색상 코드 | `#3d2817` |
| `curliness` | 머리카락 곱슬거림 | `straight` |

## Development

```bash
pnpm install
pnpm dev
```

## License

MIT
