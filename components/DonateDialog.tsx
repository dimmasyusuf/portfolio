'use client';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CodeIcon,
  MinusIcon,
  PlusIcon,
} from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';

export function DonateDialog({ openDialog }: { openDialog: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [totalUnit, setTotalUnit] = useState(1);
  const [totalPrice, setTotalPrice] = useState(5000);

  return (
    <Dialog
      open={openDialog && isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="submit"
          size="sm"
          className="w-full h-9"
        >
          Donate
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Donate</DialogTitle>
          <DialogDescription>Step {step} of 3</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="flex flex-col items-center justify-center py-8 gap-8">
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <div className="h-32 w-32">
                <Image
                  src="/images/icon_coffee.png"
                  alt="Coffee"
                  width={256}
                  height={256}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-lg">Coffee</span>
                <span className="text-sm text-muted-foreground">
                  Rp 5.000 / Unit
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center justify-center w-full">
              <span className="text-lg font-bold">
                Rp {totalPrice * totalUnit}
              </span>

              <div className="flex gap-3 items-center">
                <Button
                  size="icon"
                  onClick={() => setTotalUnit(totalUnit - 1)}
                >
                  <MinusIcon className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  max="9999"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-16 h-10 remove-arrow shadow-none text-center"
                  value={totalUnit}
                />
                <Button
                  size="icon"
                  onClick={() => setTotalUnit(totalUnit + 1)}
                >
                  <PlusIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2 w-full">
                <Button
                  variant="outline"
                  className="shadow-none"
                >
                  5 Units
                </Button>
                <Button
                  variant="outline"
                  className="shadow-none"
                >
                  10 Units
                </Button>
                <Button
                  variant="outline"
                  className="shadow-none"
                >
                  25 Units
                </Button>
                <Button
                  variant="outline"
                  className="shadow-none"
                >
                  100 Units
                </Button>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-row justify-between items-center w-full">
          {step > 1 && (
            <Button
              variant="secondary"
              onClick={() => setStep(step - 1)}
              className="mr-auto"
            >
              <ArrowLeftIcon className="mr-2 w-4 h-4" />
              Back
            </Button>
          )}
          {step < 3 && (
            <Button onClick={() => setStep(step + 1)}>
              Next <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
          )}
          {step === 3 && (
            <Button
              onClick={() => {
                setIsOpen(false), setStep(1);
              }}
            >
              Donate <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
