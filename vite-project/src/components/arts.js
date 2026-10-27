// Эта строка найдёт ВСЕ картинки в папке независимо от их расширения (.png, .jpg, .jpeg, .webp)
const modules = import.meta.glob('../assets/arts/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG}', { eager: true });

// Сортируем по названию и собираем в массив
const arts = Object.keys(modules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map((path, index) => ({
    id: index + 1,
    src: modules[path].default,
    title: `Арт ${index + 1}`,
  }));

export default arts;
