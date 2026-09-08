/**
 * UploadTile — homework hand-in, one file at a time.
 *
 * Dashed border says "put it here". Uploading shows honest progress;
 * errors offer a retry, they don't scold.
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from './ThemeContext';
import { sp, r, fs, fw, font, icon } from './tokens';
import { Icon } from './Icon';
import { LinearProgress } from './Progress';
import { Button } from './Button';

export type UploadTileState = 'idle' | 'uploading' | 'uploaded' | 'error';

interface UploadTileProps {
  state?: UploadTileState;
  /** e.g. "Add your homework" */
  label?: string;
  /** e.g. "PDF or photo, up to 10 MB" */
  hint?: string;
  fileName?: string;
  /** e.g. "2.4 MB" */
  fileMeta?: string;
  /** 0–100, for uploading state */
  progress?: number;
  errorMessage?: string;
  onPress?: () => void;
  onRemove?: () => void;
  onRetry?: () => void;
  disabled?: boolean;
}

export function UploadTile({
  state = 'idle', label = 'Add a file', hint, fileName, fileMeta,
  progress = 0, errorMessage = 'Upload failed', onPress, onRemove, onRetry, disabled,
}: UploadTileProps) {
  const { theme } = useTheme();

  if (state === 'idle') {
    return (
      <Pressable
        onPress={onPress} disabled={disabled}
        accessibilityRole="button" accessibilityLabel={label}
        style={({ pressed }) => ({
          alignItems: 'center', gap: sp[2], padding: sp[6],
          borderWidth: 1.5, borderStyle: 'dashed', borderColor: theme.borderStrong, borderRadius: r[3],
          backgroundColor: pressed ? theme.hoverOverlay : 'transparent',
          opacity: disabled ? 0.4 : 1,
        })}
      >
        <View style={{
          width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
          backgroundColor: theme.bgSunken,
        }}>
          <Icon name="plus" size={icon.lg} color={theme.fgMuted} />
        </View>
        <Text style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg }}>{label}</Text>
        {hint ? <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: theme.fgFaint }}>{hint}</Text> : null}
      </Pressable>
    );
  }

  const isError = state === 'error';

  return (
    <View style={{
      gap: sp[3], padding: sp[4],
      backgroundColor: theme.bgRaised,
      borderWidth: 1, borderColor: isError ? theme.dangerBorder : theme.border, borderRadius: r[3],
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp[3] }}>
        <View style={{
          width: 36, height: 36, borderRadius: r[2], alignItems: 'center', justifyContent: 'center',
          backgroundColor: isError ? theme.dangerSoft : theme.bgSunken,
        }}>
          <Icon name={isError ? 'warning' : 'document'} size={icon.lg} color={isError ? theme.danger : theme.fgMuted} />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ fontFamily: font.sans, fontSize: fs[14], fontWeight: fw[500], color: theme.fg }}>
            {fileName ?? 'File'}
          </Text>
          <Text style={{ fontFamily: font.mono, fontSize: fs[10], color: isError ? theme.danger : theme.fgFaint, marginTop: 2 }}>
            {state === 'uploading' ? `Uploading… ${Math.round(progress)}%`
              : state === 'uploaded' ? (fileMeta ?? 'Uploaded')
              : errorMessage}
          </Text>
        </View>
        {state === 'uploaded' && (
          <View style={{
            width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
            backgroundColor: theme.accentSoft,
          }}>
            <Icon name="check" size={icon.md} color={theme.accentText} />
          </View>
        )}
        {onRemove && state !== 'uploading' && (
          <Pressable
            onPress={onRemove} accessibilityRole="button" accessibilityLabel="Remove file" hitSlop={8}
            style={({ pressed }) => ({
              width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
              backgroundColor: pressed ? theme.hoverOverlay : 'transparent',
            })}
          >
            <Icon name="close" size={icon.md} color={theme.fgMuted} />
          </Pressable>
        )}
      </View>
      {state === 'uploading' && <LinearProgress value={progress} />}
      {isError && onRetry && <Button variant="secondary" size="sm" onPress={onRetry}>Try again</Button>}
    </View>
  );
}
