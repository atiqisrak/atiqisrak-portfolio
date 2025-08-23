import { useEffect } from 'react';
import { useActiveSection } from '@/contexts/ActiveSectionContext';

const useActiveSectionObserver = (sectionIds: string[]): void => {
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-20% 0px -35% 0px'
      }
    );

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, setActiveSection]);
};

export default useActiveSectionObserver;
