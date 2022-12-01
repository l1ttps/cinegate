import { useState } from "react";

const useDisclose = (defaultOpen?: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);

  return { isOpen, onClose, onOpen, onToggle };
};

export default useDisclose;
