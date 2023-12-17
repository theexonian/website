import Image from 'next/image'
import PreviewSeniorOfTheWeek from '@/components/PreviewSeniorOfTheWeek'
import PreviewNoDesc from '@/components/PreviewNoDesc'
import PreviewWithDesc from '@/components/PreviewWithDesc'
import PreviewCenter from '@/components/PreviewCenter'
import PreviewWithImage from '@/components/PreviewWithImage'

export default function Home() {
  return (
    <div className="flex w-screen h-auto items-center justify-center">
      {/* TODO: Optimize min-h requirement */}
      <main className="flex w-3/4 max-w-[1600px] h-auto min-h-screen">
        <div className="w-full flex flex-col flex-wrap gap-1">
          <hr className="w-full border-neutral-300"/>
          <hr className="w-full border-neutral-300"/>
          <div className="grid grid-cols-4">
						<div className="col-span-1 px-8">
							<PreviewSeniorOfTheWeek/>
							<PreviewWithImage/>
							<PreviewNoDesc/>
              <PreviewWithImage/>
						</div>
						<div className="col-span-2 px-8 border-neutral-300 border-x">
							<PreviewCenter/>
              <PreviewCenter/>
						</div>
						<div className="col-span-1 px-8">
							<PreviewNoDesc/>
              <PreviewWithImage/>
							<PreviewSeniorOfTheWeek/>
              <PreviewWithImage/>
							<PreviewWithDesc/>
						</div>
          </div>
        </div>
      </main>
    </div>
  )
}