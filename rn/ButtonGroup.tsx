/**
 * ButtonGroup — 2-4 closely related actions joined at seams.
 * Toggle groups, split buttons, toolbar clusters.
 * Children must be Button or IconButton components.
 */
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { r } from './tokens';

interface ButtonGroupProps {
  children: React.ReactNode;
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  const items = React.Children.toArray(children);

  return (
    <View style={{ flexDirection: 'row' }}>
      {items.map((child, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        const clipStyle: ViewStyle = {
          borderTopLeftRadius: isFirst ? r[2] : 0,
          borderBottomLeftRadius: isFirst ? r[2] : 0,
          borderTopRightRadius: isLast ? r[2] : 0,
          borderBottomRightRadius: isLast ? r[2] : 0,
          marginLeft: i > 0 ? -1 : 0,
        };
        return (
          <View key={i} style={clipStyle}>
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, {
                  style: { borderRadius: 0 },
                })
              : child}
          </View>
        );
      })}
    </View>
  );
}
