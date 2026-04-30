/**
 * BottomNav — mobile tab bar with icons and labels.
 * Icons inherit colour from active/inactive state automatically.
 * Pass `icon` as an IconName string for automatic sizing + colour,
 * or a render function `(color, size) => ReactNode` for custom icons.
 */
import React from 'react';
import { View, Pressable, Text, type ViewStyle, type TextStyle } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon as iconTokens, color } from './tokens';
import { Icon, type IconName } from './Icon';

interface NavItem {
  label: string;
  icon: IconName | ((color: string, size: number) => React.ReactNode);
  badge?: number;
}

interface BottomNavProps {
  items: NavItem[];
  selected: number;
  onSelect: (index: number) => void;
}

export function BottomNav({ items, selected, onSelect }: BottomNavProps) {
  const { theme } = useTheme();
  const insets = React.useContext(SafeAreaInsetsContext) || { bottom: 0 };

  const barStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: sp[3],
    paddingBottom: Math.max(sp[4], insets.bottom),
    backgroundColor: theme.bgOverlay,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  };

  return (
    <View accessibilityRole="tablist" style={barStyle}>
      {items.map((item, i) => {
        const isOn = i === selected;
        const iconColor = isOn ? theme.accent : theme.fgSubtle;
        const itemStyle: ViewStyle = {
          alignItems: 'center',
          gap: sp[1],
          minWidth: 56,
          position: 'relative',
        };
        const indicatorStyle: ViewStyle = {
          position: 'absolute',
          top: -sp[3] - sp[1],
          width: sp[6],
          height: sp[0.5],
          backgroundColor: theme.accent,
          borderBottomLeftRadius: r[1],
          borderBottomRightRadius: r[1],
          alignSelf: 'center',
        };
        const labelStyle: TextStyle = {
          fontFamily: font.sans,
          fontSize: fs[10],
          fontWeight: fw[600],
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: isOn ? theme.accent : theme.fgSubtle,
        };
        return (
          <Pressable key={i} onPress={() => onSelect(i)} style={itemStyle} accessibilityRole="tab" accessibilityState={{ selected: isOn }}>
            {isOn && <View style={indicatorStyle} />}
            {typeof item.icon === 'string'
              ? <Icon name={item.icon} size={iconTokens.tab} color={iconColor} />
              : item.icon(iconColor, iconTokens.tab)}
            <Text style={labelStyle}>{item.label}</Text>
            {item.badge != null && item.badge > 0 && (
              <View style={{
                position: 'absolute', top: 0, right: sp[1],
                minWidth: 16, height: 16, borderRadius: 8,
                backgroundColor: theme.danger, alignItems: 'center', justifyContent: 'center',
                paddingHorizontal: 4,
              }}>
                <Text style={{ fontFamily: font.mono, fontSize: fs[9], fontWeight: fw[500], color: color.chalk[100] }}>{item.badge}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
