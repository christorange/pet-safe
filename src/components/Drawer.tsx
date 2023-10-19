import type { FC } from 'react';
import { useState } from 'react';
import { Drawer } from 'vaul';

const MainDrawer: FC = () => {

  const [open, setOpen] = useState<boolean>(true)

  return (
    <>
      <Drawer.Root>
        <Drawer.Portal>
          <Drawer.Content>
            <div className='btn m-auto' onClick={()=>setOpen(false)}></div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default MainDrawer;
