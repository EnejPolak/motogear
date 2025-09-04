# MotoGear 3D Configurator

A full-stack 3D motorcycle suit configurator built with Next.js 13+, Three.js, and TypeScript.

## Features

- **3D Model Rendering**: Load and display GLB/GLTF motorcycle suit models
- **Dynamic Material Coloring**: Real-time color customization for different suit parts
- **Preset Color Schemes**: Quick selection of predefined color combinations
- **Configuration Management**: Save, load, export, and import custom configurations
- **Responsive UI**: Clean, minimalistic interface with Tailwind CSS
- **Local Storage**: Automatic saving of user configurations

## Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **3D Rendering**: Three.js via @react-three/fiber and @react-three/drei
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React hooks (useState, useEffect)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx          # Main page with Configurator
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── Configurator.tsx  # Main configurator component
│   ├── Scene3D.tsx       # 3D scene rendering
│   ├── ConfigPanel.tsx   # Configuration controls
│   └── LoadingSpinner.tsx # Loading indicator
├── models/                # Type definitions and utilities
│   └── config.ts         # Configuration management
└── textures/              # Texture assets (future use)

public/
└── models/                # 3D model files (.glb, .gltf)
    └── README.md          # Model requirements and setup
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd motogear-configurator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding 3D Models

### Model Requirements

Your GLB model should have materials named with specific keywords for proper color assignment:

- **main** - Main body material (e.g., `main_body`, `main_fabric`)
- **arms** - Arms material (e.g., `arms_fabric`, `arms_section`)
- **chest** - Chest material (e.g., `chest_panel`, `chest_area`)
- **legs** - Legs material (e.g., `legs_section`, `legs_fabric`)
- **logo** - Logo/branding material (e.g., `logo_brand`, `logo_area`)

### Setup Steps

1. Place your `.glb` file in the `public/models/` folder
2. Update the `modelPath` prop in `src/app/page.tsx`:
   ```tsx
   <Configurator modelPath="/models/your-model.glb" />
   ```
3. Ensure your materials are named according to the structure above

### Supported Formats

- GLB (Binary)
- GLTF (Text-based)

## Configuration System

### Material Colors

The configurator manages five main material colors:
- **Main**: Primary suit color
- **Arms**: Arm section color
- **Chest**: Chest panel color
- **Legs**: Leg section color
- **Logo**: Branding/logo color

### Preset Schemes

- **Classic**: Traditional black and red
- **Sport**: Orange and white sporty look
- **Stealth**: All-black stealth appearance

### Export/Import

- **Export**: Download configuration as JSON file
- **Import**: Load previously saved configurations
- **Auto-save**: Configurations are automatically saved to localStorage

## Customization

### Adding New Presets

Edit `src/models/config.ts` to add new preset color schemes:

```typescript
export const PRESET_COLORS = {
  // ... existing presets
  custom: {
    main: '#ff0000',
    arms: '#00ff00',
    chest: '#0000ff',
    legs: '#ffff00',
    logo: '#ffffff'
  }
};
```

### Modifying Material Detection

Update the material detection logic in `src/components/Scene3D.tsx`:

```typescript
if (materialName.includes('your_keyword')) {
  // Apply color logic
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for Next.js
- Tailwind CSS for styling
- Component-based architecture

## Future Enhancements

- Material type selection (leather, fabric, plastic)
- Texture mapping support
- Advanced lighting and shadows
- Export to various formats (PNG, PDF)
- Order management system
- Invoice generation
- User accounts and saved configurations

## Troubleshooting

### Common Issues

1. **Model not loading**: Check file path and ensure GLB format is valid
2. **Colors not applying**: Verify material names contain required keywords
3. **Performance issues**: Optimize model polygon count and texture sizes

### Debug Mode

Enable debug logging by adding to browser console:
```javascript
localStorage.setItem('debug', 'true')
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on the GitHub repository.
