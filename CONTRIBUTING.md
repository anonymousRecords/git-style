## Contributing to Git Style
Thank you for your interest in contributing to Git Style! This document provides guidelines for contributing to this project.

## Development Environment Setup
1. **Fork and Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/git-style.git

cd git-style
```

2. **Install Dependencies**
```bash
pnpm install
```

3. **Run Development Server**

```bash
pnpm dev
```

4. **Access the local server at http://localhost:3000**

## How to Contribute
### Bug Reports
- Check existing issues on the [Issues](https://github.com/anonymousRecords/git-style/issues) page.

- Use the Bug Report template when creating a new issue.

- Include reproducible steps and environment information.

### Feature Suggestions
- Use the Feature Request template in the Issues tab.

- Describe the purpose of the feature and its expected behavior.

### Pull Requests
1. **Create a new branch from the main branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Write code and check linting**

```bash
pnpm lint
```

3. **Commit Message Rules**

- `feat`: Add a new feature

- `fix`: Bug fix

- `docs`: Documentation changes

- `style`: Code formatting

- `refactor`: Code restructuring

- `test`: Adding tests

- `chore`: Build process or configuration changes

4. **Push and Create a PR**

```bash
git push origin feature/your-feature-name
```

## Adding New Themes
Themes are the core feature of Git Style. To add a new theme:

1. Create a new folder in the `/lib/themes/` directory.

2. Implement the following files

- `constants.ts`: Color, size, and other constants

- `renderer.ts`: Canvas rendering logic

- `client-preview.ts`: Client-side preview

- `generator.ts`: APNG generation logic

3. Register the theme in `/lib/themes/config.ts`.

4. Add the selection UI to `/components/features/theme/`.

## Code Style
- Strictly follow TypeScript strict mode.

- Use Biome for linting and formatting.

- Write components as Functional Components.

## Questions?
If you have any questions, feel free to create an Issue or start a thread in the [Discussion](https://github.com/anonymousRecords/git-style/discussions).
