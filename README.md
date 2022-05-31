<p align='center'>
  <img src='./.github/docs/images/main-workshop-slide.png' width='450px'/>
</p>

## Getting Started

Requirements: Node.js, Package Manager (yarn or NPM)

### Clone repository
```bash
# With HTTPS
https://github.com/LauraBeatris/react-query-workshop.git

# With SSH
git clone git@github.com:LauraBeatris/react-query-workshop.git

# With GitHub CLI
gh repo clone LauraBeatris/react-query-workshop
```

### Install dependencies

```bash
# With NPM
npm install

# With yarn
yarn install
```

### Create GitHub personal token & set to env variable

- Follow the instructions from the [GitHub docs page](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token) in order to create a personal token with permissions for repository operations
- Copy the `.env.example` file and add your personal token value
```bash
  cp .env.example .env
```

```.env
VITE_GITHUB_PERSONAL_TOKEN=value-here
```

### Start development server

```bash
# With NPM
npm dev

# With yarn
yarn dev
```
