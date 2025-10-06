
import React from 'react';
import { CubeIcon, UtensilsIcon, UserIcon, SettingsIcon, LayoutGridIcon } from './IconComponents';
import type { BottomNavLocale } from '../i18n/locales';

interface BottomNavProps {
    activeView: 'marketing' | 'food' | 'portrait' | 'poster';
    onViewChange: (view: 'marketing' | 'food' | 'portrait' | 'poster') => void;
    onSettingsClick: () => void;
    t: BottomNavLocale;
}

const NavItem: React.FC<{
    label: string;
    isActive?: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}> = ({ label, isActive, onClick, icon }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs font-medium transition-colors duration-200 ${
            isActive ? 'text-primary-blue' : 'text-neutral-500 dark:text-neutral-400'
        }`}
        aria-current={isActive ? 'page' : undefined}
    >
        <div className="w-6 h-6 mb-1">{icon}</div>
        <span>{label}</span>
    </button>
);

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange, onSettingsClick, t }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-700 lg:hidden">
            <nav className="flex justify-around items-center">
                <NavItem
                    label={t.product}
                    isActive={activeView === 'marketing'}
                    onClick={() => onViewChange('marketing')}
                    icon={<CubeIcon />}
                />
                <NavItem
                    label={t.food}
                    isActive={activeView === 'food'}
                    onClick={() => onViewChange('food')}
                    icon={<UtensilsIcon />}
                />
                <NavItem
                    label={t.portrait}
                    isActive={activeView === 'portrait'}
                    onClick={() => onViewChange('portrait')}
                    icon={<UserIcon />}
                />
                 <NavItem
                    label={t.poster}
                    isActive={activeView === 'poster'}
                    onClick={() => onViewChange('poster')}
                    icon={<LayoutGridIcon />}
                />
                <NavItem
                    label={t.settings}
                    onClick={onSettingsClick}
                    icon={<SettingsIcon />}
                />
            </nav>
        </div>
    );
};