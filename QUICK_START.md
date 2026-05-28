# Quick Start Guide - CochichoApp Multi-Group Architecture

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator or Android Emulator installed

### Installation

```bash
cd CochichoApp2
npm install
```

### Running the App

```bash
# Start development server
npx expo start

# iOS Simulator (macOS only)
npx expo start --ios

# Android Emulator
npx expo start --android

# Web Browser
npx expo start --web
```

## Project Structure at a Glance

```
src/
├── app/                          # Expo Router - File-based routing
│   ├── _layout.tsx               # Root layout (providers + Stack nav)
│   ├── (tabs)/                   # Tab-based navigation group
│   │   ├── _layout.tsx           # Tab container
│   │   ├── index.tsx             # Home - Groups list
│   │   ├── explore.tsx           # Explore screen
│   │   └── profile/index.tsx      # Profile screen
│   └── chat/                      # Chat screens
│       ├── [id].tsx              # Chat by group ID
│       └── [id]/info.tsx          # Group info modal
├── components/                    # Reusable UI components
│   ├── ChatBubble.tsx            # Message display
│   ├── ChatInput.tsx             # Message input field
│   └── GroupHeader.tsx           # Group header component
├── context/                       # State management
│   └── groupcontext.tsx          # Group state & persistence
└── hooks/                         # Custom hooks
    └── use-color-scheme.ts       # Theme detection
```

## Key Files to Understand

### 1. Root Layout (`src/app/_layout.tsx`)
- Initializes providers (Theme, Context)
- Sets up Stack navigation for modal presentations
- Manages animation and presentation options

### 2. Tab Layout (`src/app/(tabs)/_layout.tsx`)
- Defines bottom tab navigation
- Connects Home, Explore, Profile screens
- Uses Expo Router's `NativeTabs`

### 3. Chat Screen (`src/app/chat/[id].tsx`)
- Displays messages for a group
- Handles message input and sending
- Accepts group ID from route params
- Integrates with context for data

### 4. Group Context (`src/context/groupcontext.tsx`)
- Global state for all groups
- AsyncStorage persistence
- Methods: adicionarGrupo, atualizarGrupo, adicionarMensagem, etc.

## Common Tasks

### Navigate to a Group Chat
```typescript
import { useRouter } from "expo-router";

const router = useRouter();
router.push(`/chat/${groupId}`);
```

### Access Group Data
```typescript
import { useContext } from "react";
import { GrupoContext } from "@/context/groupcontext";

const { grupos, obterGrupo, adicionarMensagem } = useContext(GrupoContext);
const grupo = obterGrupo(groupId);
```

### Send a Message
```typescript
const handleSend = (text: string) => {
  const message = {
    id: Date.now(),
    texto: text,
    enviadoPorMim: true,
    timestamp: Date.now(),
  };
  adicionarMensagem(groupId, message);
};
```

### Update Group Info
```typescript
atualizarGrupo(groupId, {
  nomeGrupo: newName,
  fotoGrupo: newPhotoUrl,
});
```

## Useful Commands

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Clean build
rm -rf .expo node_modules && npm install

# Clear cache
npx expo start --clear

# Run on specific platform
npx expo start --only web
npx expo start --only ios
npx expo start --only android
```

## Debugging Tips

### Enable React DevTools
```bash
npx expo start --dev-client
```

### View Network Traffic
- Use Expo DevTools Network inspector
- Press Shift+M in terminal during development

### Check AsyncStorage Data
```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

// View all stored data
AsyncStorage.getAllKeys().then((keys) => {
  AsyncStorage.multiGet(keys).then((result) => {
    console.log(result);
  });
});
```

### Monitor Context Changes
```javascript
// In any component using context
const grupo = useContext(GrupoContext);
console.log("Group context updated:", grupo);
```

## Testing Checklist

When testing locally:

- [ ] App starts without errors
- [ ] Three tabs are visible and clickable
- [ ] Groups list displays all groups
- [ ] Clicking a group navigates to chat
- [ ] Messages display in correct order
- [ ] Can send and receive messages
- [ ] Messages persist after app reload
- [ ] Group header opens info screen
- [ ] Can edit group name in info screen
- [ ] Can change group photo in info screen
- [ ] Profile tab shows correct stats
- [ ] Keyboard doesn't overlap input field
- [ ] Back navigation works correctly
- [ ] Works on iOS, Android, and Web

## Known Limitations

1. **Single Device**: No real-time sync between devices
2. **Group Size**: Optimized for up to ~100 groups
3. **Messages**: No message editing/deletion yet
4. **Media**: No image/file sharing yet

## Next Steps

1. **Testing**: Run on emulators and real devices
2. **Customization**: Modify colors in theme constants
3. **Enhancement**: Add search, reactions, or other features
4. **Deployment**: Build for iOS and Android

## Documentation

- **REFACTORING_GUIDE.md** - Detailed architecture overview
- **README.md** - Project setup and general info
- **Type Definitions** - Full TypeScript types in component files

## Support & Resources

- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **Expo Router**: https://expo.dev/router

---

**Happy coding!** 🚀
