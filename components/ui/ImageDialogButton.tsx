import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

type Props = {
  url: string;
  label: string;
  icon: React.ReactNode;
};

export function ImageDialogButton({ url, label, icon }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          {icon} {label}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[400px] max-w-full bg-transparent p-0 outline-none">

          {/* Accessibility Fix */}
          <Dialog.Title className="hidden">{label}</Dialog.Title>
          <Dialog.Description className="hidden">
            Image preview dialog
          </Dialog.Description>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-center">
                {label}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center items-center p-0 pb-4">
              <img
                src={url}
                alt={label || "preview"}
                className="max-h-[60vh] max-w-full object-contain rounded"
              />
            </CardContent>

            <div className="flex justify-center pb-4">
              <Dialog.Close asChild>
                <Button variant="secondary">
                  إغلاق
                </Button>
              </Dialog.Close>
            </div>
          </Card>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
