'use client'
import { Button } from "registry/default/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "registry/default/ui/dialog"
import { Label } from "registry/default/ui/label"
import {Input} from "registry/default/ui/input";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {useConfig} from "@/hooks/use-config";
import {ThemeWrapper} from "@/components/theme-wrapper";
import {CheckIcon, MoonIcon, ResetIcon, SunIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {themes} from "@/registry/themes";
import {Skeleton} from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import {v} from "prisma/build/public/assets/vendor";
import {ScrollArea} from "@/components/ui/scroll-area";
import {SaveAllIcon, SaveIcon} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import axios from "axios";
import dayjs from "dayjs";
import {toast} from "@/components/ui/use-toast";
import {HexColorPicker} from "react-colorful";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
const QRCode = dynamic(() => import("lib/QRCode"), {
  loading: () => <p>Loading...</p>,
})
const vnptConfig =  {
  "dotsOption": "rounded",
  "cornersSquareOption": "dot",
  "cornersDotOption": "dot",
  "cornersDotColor": "#2F63B0",
  "backgroundColor": "white",
  "mainColor": "black",
  'imageLogo': '/vpt_logo.png'
}
const defaulConfig =  {
  "dotsOption": "",
  "cornersSquareOption": "",
  "cornersDotOption": "",
  "cornersDotColor": "black",
  "backgroundColor": "",
  "mainColor": "black",
}

const styleDot = [
  {
    "name": "dots",
    "label": "Chấm",
    radiusLeft: 100,
    radiusRight: 100,
  },
  {
    "name": "rounded",
    "label": "Bo tròn",
    radiusLeft: 100,
    radiusRight: 100,
  },
  {
    "name": "square",
    "label": "vuông",
  },
  {
    "name": "classy",
    "label": "Bo 2 góc",

    radiusLeft: 10,
  },
]
const styleDotCorner = [
  {
    "name": "dot",
    "label": "Chấm",
    radius: 100
  },
  {
    "name": "square",
    "label": "vuông",
  },
]
const styleSquareCorner = [
  {
    "name": "dot",
    "label": "Chấm",
      radius: 100
  },
  {
    "name": "extra-rounded",
    "label": "Bo tròn",

    radius: 4
  },
  {
    "name": "square",
    "label": "vuông",
  },
]
  const colors=[

    {
      "name": "vnpt",
      "label": "VNPT",
      "activeColor": "#2F63B0"
    },
    {
      "name": "black",
      "label": "Black",
      "activeColor": "#000000"
    },
  {
    "name": "tomato",
    "label": "Tomato",
    "activeColor": "#FF6347"
  },
    {
      "name": "rose",
      "label": "Rose",
      "activeColor": "#FF007F"
    },
    {
      "name": "mango",
      "label": "Mango",
      "activeColor": "#FFA500"
    },
    {
      "name": "leaf",
      "label": "Leaf",
      "activeColor": "#2E8B57"
    },

  ]

function Customizer({data, setData}) {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme: setMode, resolvedTheme: mode } = useTheme()
  const [config, setConfig] = useState({style: 'vnpt'})
  const [imageLogo, setImageLogo] = useState(false)
  const [customImage, setCustomImage] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.post('/api/qrconfig', {
      ...data.qrconfig,
      linkId: data.id
    })
      .then(function (response) {
        toast({
          variant: "default",
          title: "Lưu thành công.",
          description: "",
        })
      })
      .catch(function (error) {
        toast({
          variant: "destructive",
          title: "Short link đã được tạo, nhập lại short link khác.",
          description: "",
        })
      })
  }


  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ScrollArea className="h-72 w-full">
    <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <div className="flex w-full items-center">
            <Label className="text-xs">Kiểu</Label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => {
                setConfig({ ...config, style: "default" });
                setData(prev =>({...prev, qrconfig: defaulConfig}))
              }}
              className={cn(
                config.style === "default" && "border-2 border-primary"
              )}
            >
              Mặc định
            </Button>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => {
                setConfig({ ...config, style: "new-york" });
                setData(prev =>({...prev, qrconfig: vnptConfig}))
              }}
              className={cn(
                config.style === "vnpt" && "border-2 border-primary"
              )}
            >
              VNPT
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode" className="text-xs">Bật logo</Label>
          <Switch id="airplane-mode" value={!!data?.qrconfig?.imageLogo} onCheckedChange={checked => {setImageLogo(checked);
            setData(prev => ({...prev, qrconfig:{
              ...prev.qrconfig,
              imageLogo: '/vpt_logo.png'
            }}) )}}/>
          {imageLogo && <><Label htmlFor="airplane-mode" className="text-xs"> Tùy chỉnh logo </Label>
          <Switch id="airplane-mode" value={customImage} onCheckedChange={checked => {
            if (!checked){
              setData(prev => ({...prev, qrconfig:{
                  ...prev.qrconfig,
                  imageLogo: ''
                }}) )            }
            setCustomImage(checked)}}/>
          </>
      }
        </div>

      {customImage && 	<Input
        type="url"
        autoComplete="off"
        placeholder="https://"
        className="w-full"
        name="url"
        value={data?.qrconfig?.imageLogo}
        onChange={(e) => setData(prev =>({...prev, qrconfig: {
            ...prev.qrconfig,
            imageLogo: e.target.value
          }}))}
      />}
        <div className="grid grid-cols-2 gap-8">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
          <Label className="text-xs">Màu chính</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                size="sm"

                style={
                  {
                    "--theme-primary": data?.qrconfig?.mainColor,
                    "border-color": data?.qrconfig?.mainColor
                  }
                }
              >
                  <span
                    className={cn(
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-xl bg-[--theme-primary]"
                    )}
                  >
                  </span>
                Chọn màu
              </Button>
            </PopoverTrigger>
            <PopoverContent className="h-auto w-full">
          <HexColorPicker color={data?.qrconfig?.mainColor} onChange={color=>setData(prev => ({...prev, qrconfig:{
              ...prev.qrconfig,
              mainColor: color
            }}) )} />
            </PopoverContent>
          </Popover>
            </div>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((theme) => {
              const isActive = config.theme === theme.name

              return mounted ? (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    setConfig({
                      ...config,
                      theme: theme.name,
                    })
                    setData(prev => ({...prev, qrconfig:{
                      ...prev.qrconfig,
                        mainColor: theme.activeColor
                      }}) )
                  }}
                  className={cn(
                    "justify-start",
                    isActive && "border-2 border-primary"
                  )}
                  style={
                    {
                      "--theme-primary": theme?.activeColor,
                      "border-color": isActive && theme?.activeColor
                    }
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-xl bg-[--theme-primary]"
                    )}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={theme.name} />
              )
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label className="text-xs">Màu góc</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  size="sm"

                  style={
                    {
                      "--theme-primary": data?.qrconfig?.cornersDotColor,
                      "border-color": data?.qrconfig?.cornersDotColor
                    }
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-xl bg-[--theme-primary]"
                    )}
                  >
                  </span>
                  Chọn màu
                </Button>
              </PopoverTrigger>
              <PopoverContent className="h-auto w-full">
                <HexColorPicker color={data?.qrconfig?.cornersDotColor} onChange={color=>setData(prev => ({...prev, qrconfig:{
                    ...prev.qrconfig,
                    cornersDotColor: color
                  }}) )} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((theme) => {
              const isActive = config.corner === theme.name

              return mounted ? (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    setConfig({
                      ...config,
                      corner: theme.name,
                    })
                    setData(prev => ({...prev, qrconfig:{
                      ...prev.qrconfig,
                        cornersDotColor: theme.activeColor
                      }}) )
                  }}
                  className={cn(
                    "justify-start",
                    isActive && "border-2 border-primary"
                  )}
                  style={
                    {
                      "--theme-primary": theme?.activeColor,
                      "border-color": isActive && theme?.activeColor
                    }
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-xl bg-[--theme-primary]"
                    )}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={theme.name} />
              )
            })}
          </div>
        </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Kiểu chấm</Label>

          <div className="grid grid-cols-4 gap-2">
            {styleDot.map(theme=> {
              const isActive = config.dotStyle === theme.name
              return (
                <>
                  <Button
                    variant={"outline"}
                    size="sm"
                    onClick={() => {
                      setConfig({
                        ...config,
                        dotStyle: theme.name,
                      })
                      setData(prev => ({...prev, qrconfig:{
                          ...prev.qrconfig,
                          dotsOption: theme.name
                        }}) )
                    }}
                    className={cn(isActive&& "border-2 border-primary")}
                  >
                  <span
                    className={
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center "
                    }
                    style={
                    {
                      backgroundColor: data?.qrconfig?.mainColor,
                      borderTopLeftRadius: theme.radiusLeft,
                      borderBottomRightRadius: theme.radiusLeft,
                      borderTopRightRadius: theme.radiusRight,
                      borderBottomLeftRadius: theme.radiusRight,
                    }}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white"/>}
                  </span>
                    {theme.label}

                  </Button>
                </>
              )
            }) }
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Kiểu góc</Label>
          <div className="grid grid-cols-3 gap-2">
            {styleSquareCorner.map(theme=> {
              const isActive = config.squareStyle === theme.name
              return (
                <>
                  <Button
                    variant={"outline"}
                    size="sm"
                    onClick={() => {
                      setConfig({
                        ...config,
                        squareStyle: theme.name,
                      })
                      setData(prev => ({...prev, qrconfig:{
                          ...prev.qrconfig,
                          cornersSquareOption: theme.name
                        }}) )
                    }}
                    className={cn(isActive&& "border-2 border-primary")}
                  >
                  <span
                    className={
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center "
                    }
                    style={
                      {
                        backgroundColor: data?.qrconfig?.mainColor,
                        borderRadius: theme.radius
                      }}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white"/>}
                  </span>
                    {theme.label}

                  </Button>
                </>
              )
            }) }
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Kiểu mắt</Label>
          <div className="grid grid-cols-2 gap-8">
            {styleDotCorner.map(theme=> {
              const isActive = config.cornersDot === theme.name
              return (
                <>
                  <Button
                    variant={"outline"}
                    size="sm"
                    onClick={() => {
                      setConfig({
                        ...config,
                        cornersDot: theme.name,
                      })
                      setData(prev => ({...prev, qrconfig:{
                          ...prev.qrconfig,
                          cornersDotOption: theme.name
                        }}) )
                    }}
                    className={cn(isActive&& "border-2 border-primary")}
                  >
                  <span
                    className={
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center "
                    }
                    style={
                    {
                      backgroundColor: data?.qrconfig?.cornersDotColor,
                      borderRadius: theme.radius
                    }}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white"/>}
                  </span>
                    {theme.label}

                  </Button>
                </>
              )
            }) }
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5 mr-10">
      <Button
        onClick={onSubmit}
              className="rounded-xl border border-primary bg-blue-600 px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-primary"
      >
        <SaveIcon className="mr-2 h-4 w-4" /> Lưu tùy chỉnh QR
      </Button>
      </div>
    </ScrollArea>
  )
}

export function QrModal({record}) {
  const [data, setData] = useState(record)
  const [qrconfig, setQrconfig] = useState()
  useEffect(() => {
    if (!record.qrconfig)
    {
      setData(prev=>({...prev, qrconfig: vnptConfig}))
    }
  }, []);

return(
  <Dialog>
  <DialogTrigger asChild>
    <button
      className="group rounded-xl bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 focus:outline-none active:scale-95">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-qr-code h-4 w-4 text-gray-700 transition-all group-hover:text-blue-800"
      >
        <rect width={5} height={5} x={3} y={3} rx={1}/>
        <rect width={5} height={5} x={16} y={3} rx={1}/>
        <rect width={5} height={5} x={3} y={16} rx={1}/>
        <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
        <path d="M21 21v.01"/>
        <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
        <path d="M3 12h.01"/>
        <path d="M12 3h.01"/>
        <path d="M12 16v.01"/>
        <path d="M16 12h1"/>
        <path d="M21 12v.01"/>
        <path d="M12 21v-1"/>
      </svg>
    </button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[325px] overflow-scroll">
    <DialogHeader>
      <DialogTitle>QR Code</DialogTitle>
      <DialogDescription>
        QR Code của đường dẫn rút gọn.
      </DialogDescription>
    </DialogHeader>
    <div className="flex flex-col space-y-6 bg-gray-50 py-6 text-left">
      <div className="mx-auto rounded-xl border-2 border-gray-200 bg-white p-4">
        <QRCode qrConfig={data?.qrconfig} shortUrl={data?.shortUrl}/>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-md">Tùy chọn</AccordionTrigger>
          <AccordionContent>
            <Customizer data={data} setData={setData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/*<AdvancedSettings*/}
      {/*  qrData={qrData}*/}
      {/*  setFgColor={setFgColor}*/}
      {/*  showLogo={showLogo}*/}
      {/*  setShowLogo={setShowLogo}*/}
      {/*  setShowLinkQRModal={setShowLinkQRModal}*/}
      {/*/>*/}

      {/*<div className="grid grid-cols-2 gap-2 px-4 sm:px-16">*/}
      {/*  <QrDropdown*/}
      {/*    button={*/}
      {/*      <>*/}
      {/*        <Clipboard />*/}
      {/*        <p>Copy</p>*/}
      {/*      </>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <>*/}
      {/*      <button*/}
      {/*        onClick={async () => {*/}
      {/*          toast.promise(copyToClipboard, {*/}
      {/*            loading: "Copying QR code to clipboard...",*/}
      {/*            success: "Copied QR code to clipboard!",*/}
      {/*            error: "Failed to copy",*/}
      {/*          });*/}
      {/*        }}*/}
      {/*        className="w-full rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"*/}
      {/*      >*/}
      {/*        <IconMenu*/}
      {/*          text="Image"*/}
      {/*          icon={*/}
      {/*            copiedImage ? (*/}
      {/*              <Check className="h-4 w-4" />*/}
      {/*            ) : (*/}
      {/*              <Photo className="h-4 w-4" />*/}
      {/*            )*/}
      {/*          }*/}
      {/*        />*/}
      {/*      </button>*/}
      {/*      <button*/}
      {/*        onClick={() => {*/}
      {/*          navigator.clipboard.writeText(*/}
      {/*            `https://api.dub.co/qr?url=${linkConstructor({*/}
      {/*              key: props.key,*/}
      {/*              domain: props.domain,*/}
      {/*            })}`,*/}
      {/*          );*/}
      {/*          toast.success("Copied QR code URL to clipboard!");*/}
      {/*          setCopiedURL(true);*/}
      {/*          setTimeout(() => setCopiedURL(false), 2000);*/}
      {/*        }}*/}
      {/*        className="w-full rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"*/}
      {/*      >*/}
      {/*        <IconMenu*/}
      {/*          text="URL"*/}
      {/*          icon={*/}
      {/*            copiedURL ? (*/}
      {/*              <Check className="h-4 w-4" />*/}
      {/*            ) : (*/}
      {/*              <Link2 className="h-4 w-4" />*/}
      {/*            )*/}
      {/*          }*/}
      {/*        />*/}
      {/*      </button>*/}
      {/*    </>*/}
      {/*  </QrDropdown>*/}
      {/*  <QrDropdown*/}
      {/*    button={*/}
      {/*      <>*/}
      {/*        <Download />*/}
      {/*        <p>Export</p>*/}
      {/*      </>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <>*/}
      {/*      <button*/}
      {/*        onClick={() => {*/}
      {/*          download(*/}
      {/*            getQRAsSVGDataUri({*/}
      {/*              ...qrData,*/}
      {/*              ...(qrData.imageSettings && {*/}
      {/*                imageSettings: {*/}
      {/*                  ...qrData.imageSettings,*/}
      {/*                  src: logo || "https://dub.co/_static/logo.svg",*/}
      {/*                },*/}
      {/*              }),*/}
      {/*            }),*/}
      {/*            "svg",*/}
      {/*          );*/}
      {/*        }}*/}
      {/*        className="w-full rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"*/}
      {/*      >*/}
      {/*        <IconMenu text="SVG" icon={<Photo className="h-4 w-4" />} />*/}
      {/*      </button>*/}
      {/*      <button*/}
      {/*        onClick={async () => {*/}
      {/*          download(*/}
      {/*            (await getQRAsCanvas(qrData, "image/png")) as string,*/}
      {/*            "png",*/}
      {/*          );*/}
      {/*        }}*/}
      {/*        className="w-full rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"*/}
      {/*      >*/}
      {/*        <IconMenu text="PNG" icon={<Photo className="h-4 w-4" />} />*/}
      {/*      </button>*/}
      {/*      <button*/}
      {/*        onClick={async () => {*/}
      {/*          download(*/}
      {/*            (await getQRAsCanvas(qrData, "image/jpeg")) as string,*/}
      {/*            "jpg",*/}
      {/*          );*/}
      {/*        }}*/}
      {/*        className="w-full rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"*/}
      {/*      >*/}
      {/*        <IconMenu text="JPEG" icon={<Photo className="h-4 w-4" />} />*/}
      {/*      </button>*/}
      {/*    </>*/}
      {/*  </QrDropdown>*/}
      {/*</div>*/}

      {/*/!* This will be used to prompt downloads. *!/*/}
      {/*<a*/}
      {/*  className="hidden"*/}
      {/*  download={`${props.key}-qrcode.svg`}*/}
      {/*  ref={anchorRef}*/}
      {/*/>*/}
    </div>

    {/*<DialogFooter>*/}
    {/*  <Button type="reset">Thoát</Button>*/}
    {/*</DialogFooter>*/}
  </DialogContent>
</Dialog>
)
}
