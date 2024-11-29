import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useDarkMode } from '../interfaces/DarkMode'
import { DotsThreeVertical, DownloadSimple, Heart, QrCode, ShareFat } from '@phosphor-icons/react'


export default function Example() {

    const { isDarkMode } = useDarkMode()

    return (
        <div className="text-right">
            <Menu>
                <MenuButton className={`inline-flex items-center gap-2 rounded-full p-1.5 text-sm/6 font-semibold focus:outline-none    data-[focus]:outline-white ${isDarkMode ? ' data-[open]:bg-gray-900 data-[hover]:bg-gray-900 text-gray-200' : 'hover:bg-gray-50'} transition-colors`}>

                    <DotsThreeVertical size={32} />
                </MenuButton>
                <MenuItems
                    transition
                    anchor="bottom end"
                    className={`w-52 origin-top-right rounded-md mt-2 p-1 text-sm/6  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white border '}`}
                >
                    <MenuItem>
                        <button className={`group flex w-full items-center gap-2 rounded py-1.5 px-3 hover:bg-cyan-500 hover:text-white  ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        <Heart size={20} weight="fill" />
                            Añadir a Favoritos
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button className={`group flex w-full items-center gap-2 rounded py-1.5 px-3 hover:bg-cyan-500 hover:text-white  ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        <ShareFat size={20} weight="fill" />

                            Compartir
                        </button>
                    </MenuItem>
                    <div className={`my-1 h-px bg-white`} />
                    <MenuItem>
                        <button className={`group flex w-full items-center gap-2 rounded py-1.5 px-3 hover:bg-cyan-500 hover:text-white  ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>

                        <DownloadSimple size={20} weight="regular" />
                            Descargar
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button className={`group flex w-full items-center gap-2 rounded py-1.5 px-3 hover:bg-cyan-500 hover:text-white  ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>

                        <QrCode size={20} weight='light' />
                            QR
                            
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    )
}