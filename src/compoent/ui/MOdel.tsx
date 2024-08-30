import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface Iprops {
  isOpen: boolean; // حالة فتح أو إغلاق الـ Modal
  closeModal: () => void; // دالة لإغلاق الـ Modal
  title?: string; // عنوان اختياري للـ Modal
  children: ReactNode; // محتويات الـ Modal
}

const MyModal = ({ isOpen, closeModal, title, children }: Iprops) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 backdrop-blur-sm " aria-hidden="true"></div>
          {/* الخلفية المظللة عند فتح الـ Modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          {/* صندوق الـ Modal */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl flex flex-col justify-start  bg-white p-3 text-left align-middle shadow-xl transition-all">
                  {/* عرض العنوان إذا كان موجودًا */}
                  {title && (
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mt-5">
                      {title}
                    </Dialog.Title>
                  )}
                  {/* محتوى الـ Modal */}
                  <div className="mt-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MyModal;
