import { Reflow } from './reflow';

const root = document.getElementById('root')!;
const editor = new Reflow(root);

editor.import(
  '[{"title":"Node title","content":"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quisquam minus, quasi voluptas amet delectus quibusdam quod ipsa odio quos reprehenderit eaque exercitationem architecto harum sapiente cupiditate qui. Dicta, pariatur?","posX":615,"posY":181},{"title":"Node title","content":"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quisquam minus, quasi voluptas amet delectus quibusdam quod ipsa odio quos reprehenderit eaque exercitationem architecto harum sapiente cupiditate qui. Dicta, pariatur?","posX":1500,"posY":276},{"title":"Node title","content":"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quisquam minus, quasi voluptas amet delectus quibusdam quod ipsa odio quos reprehenderit eaque exercitationem architecto harum sapiente cupiditate qui. Dicta, pariatur?","posX":1062,"posY":108}]'
);

const btn_addNode = document.getElementById('addNode');
btn_addNode?.addEventListener('click', () => {
  const title = 'Node title';
  const content =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quisquam minus, quasi voluptas amet delectus quibusdam quod ipsa odio quos reprehenderit eaque exercitationem architecto harum sapiente cupiditate qui. Dicta, pariatur?';

  editor.addNode({ title, content });
});

const btn_export = document.getElementById('export');
btn_export?.addEventListener('click', () => {
  const data = editor.export();
  console.log(data);
});
