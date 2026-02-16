<div align="center">
  <img src="./docs/doc.png" alt="Git Style Preview" width="300">
</div>

<br />

- [한국어](./docs/README-ko.md)
- [git-style.vercel.app](https://git-style.vercel.app)

<br />

> Turn your GitHub contributions into beautiful visuals. Style your commits your way.

## Usage

1. Pick a theme and style.
2. Enter your GitHub username.
3. Paste the generated markdown into your `README.md`.

## Themes

| Theme | Status |
|-------|--------|
| Flower | Available |
| Hair | Available |
| Cloud | Soon |

### Flower

![Git Style](https://git-style.vercel.app/api/anonymousRecords/animation?flower=default&color=%23fbbf24)

Customize flower type and color.

**Types**: `default`(Daisy), `tulip`, `sunflower`, `cherry`

**Query Parameters**

| Param | Description | Default |
|-------|-------------|---------|
| `flower` | Flower type | `default` |
| `color` | HEX color code | `#fbbf24` |

### Hair

![GitStyle](https://git-style.vercel.app/api/anonymousRecords/animation?theme=hair&quality=low&color=%233d2817&curliness=straight)

Customize hair color and curliness.

**Curliness**: `straight`, `wavy`, `curly`

**Query Parameters**

| Param | Description | Default |
|-------|-------------|---------|
| `color` | HEX color code | `#3d2817` |
| `curliness` | Hair curliness | `straight` |

## Development

```bash
pnpm install
pnpm dev
```

## License

MIT
