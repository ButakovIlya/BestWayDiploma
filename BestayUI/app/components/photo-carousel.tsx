"use client";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { Input } from "./ui/input";
import { ChangeEvent, useCallback, useRef } from "react";
import { Photo } from "../types";
import styles from "./photo-carousel.module.css";

interface PhotoCarouselProps {
  photos: Photo[];
  onUploadMain: (file: File) => void;
  onUploadNew: (file: File) => void;
  onRemove: (id: number) => void;
}

export function PhotoCarousel(props: PhotoCarouselProps) {
  const { photos, onUploadMain, onUploadNew, onRemove } = props;

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleUploadMain = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];
        onUploadMain(file);
      }
      event.target.value = "";
    },
    [],
  );

  const handleUploadNew = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];
        onUploadNew(file);
      }
      event.target.value = "";
    },
    [],
  );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="h-[200px] px-10">
        {photos.map((photo) => (
          <CarouselItem key={photo.id}>
            {photo.url ? (
              photo.main ? (
                <div>
                  <Image
                    className={styles["photo"]}
                    src={photo.url}
                    alt="Фото"
                    width={400}
                    height={300}
                  />
                  <Button
                    variant="outline"
                    className="relative top-[-195px] left-[255px]"
                    onClick={() => {
                      avatarInputRef?.current?.click();
                    }}
                  >
                    <Plus />
                  </Button>
                  <Input
                    ref={avatarInputRef}
                    className={"hidden"}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleUploadMain}
                  />
                </div>
              ) : (
                <div>
                  <Image
                    className={styles["photo"]}
                    src={photo.url}
                    alt="Фото"
                    width={300}
                    height={200}
                  />
                  <Button
                    variant="outline"
                    className="relative top-[-195px] left-[255px]"
                    onClick={() => {
                      onRemove(photo.id);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              )
            ) : (
              <div>
                <Button
                  className="w-[300px] h-[200px]"
                  variant="outline"
                  onClick={() => {
                    avatarInputRef?.current?.click();
                  }}
                >
                  <Plus />
                  Добавить главное фото
                </Button>
                <Input
                  ref={avatarInputRef}
                  className={"hidden"}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleUploadMain}
                />
              </div>
            )}
          </CarouselItem>
        ))}
        <CarouselItem>
          <Button
            className="w-[300px] h-[200px]"
            variant="outline"
            onClick={() => {
              photoInputRef?.current?.click();
            }}
          >
            <Plus />
            Добавить фото
          </Button>
          <Input
            ref={photoInputRef}
            className={"hidden"}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleUploadNew}
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
