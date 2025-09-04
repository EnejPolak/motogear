# 3D Models

This folder contains the 3D models for the motorcycle suit configurator.

## Current Model

✅ **moto1.glb** - Motorcycle suit model ready for use

## Required Model Structure

Your GLB model should have materials named with the following keywords for proper color assignment:

- **main** - Main body material
- **chest** - Chest material  
- **sides** - Sides material
- **arms** - Arms material
- **legs** - Legs material
- **knees** - Knees material
- **sheins** - Sheins material
- **logo_leva** - Left logo material
- **logo_chest** - Chest logo material
- **logo_desna** - Right logo material
- **logo_back** - Back logo material

## Example Material Names

```
main_body
chest_panel
sides_fabric
arms_section
legs_fabric
knees_pad
sheins_area
logo_leva_brand
logo_chest_brand
logo_desna_brand
logo_back_brand
```

## Model Setup

The model is already configured and ready to use:

1. ✅ **moto.glb** is in the correct location (`public/models/`)
2. ✅ **Model path** is set in `src/app/page.tsx`
3. ✅ **Material detection** is configured for all 11 materials

## Adding New Models

If you want to add additional models:

1. Place your `.glb` file in this folder
2. Update the `modelPath` prop in `src/app/page.tsx` to match your filename
3. Ensure your materials are named according to the structure above

## Supported Formats

- GLB (Binary) ✅
- GLTF (Text-based)

## Notes

- The configurator automatically detects materials by name
- Materials not matching the keywords will retain their original colors
- Current model: `moto.glb` with 11 customizable materials
