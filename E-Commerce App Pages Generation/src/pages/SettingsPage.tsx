import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { motion } from 'motion/react';
import { Moon, Bell, Lock, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { useStore } from '../lib/store';
import { Switch } from '../components/ui/switch';

export function SettingsPage() {
  const { isDarkMode, toggleTheme } = useStore();

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: Moon,
          label: 'Dark Mode',
          type: 'toggle',
          value: isDarkMode,
          onChange: toggleTheme,
        },
        {
          icon: Bell,
          label: 'Push Notifications',
          type: 'toggle',
          value: true,
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          icon: Lock,
          label: 'Change Password',
          type: 'link',
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: FileText,
          label: 'Terms & Conditions',
          type: 'link',
        },
        {
          icon: FileText,
          label: 'Privacy Policy',
          type: 'link',
        },
        {
          icon: HelpCircle,
          label: 'Help & Support',
          type: 'link',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Settings" showBack showSearch={false} />

      <div className="px-4 py-6 space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h3 className="text-sm text-gray-500 mb-3 px-2">{section.title}</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                    className="p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className="flex-1 text-gray-900">{item.label}</span>
                    {item.type === 'toggle' ? (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                      />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        <div className="pt-4 text-center">
          <p className="text-sm text-gray-500">Version 1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2025 Loveble. All rights reserved.</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
