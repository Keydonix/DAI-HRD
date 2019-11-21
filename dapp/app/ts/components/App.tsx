import { DaiWasted } from './DaiWasted';
import { Modal } from './Modal';
import { DepositDai } from './DepositDai';
import { Connect } from './Connect';
import { GetMetaMask } from './GetMetaMask';
import { WithdrawDai } from './WithdrawDai';
import { SpinnerPanel } from './Spinner';
import { SendDai } from './SendDai';
import { SendDaiHrd } from './SendDaiHrd';

export interface AppModel {
	readonly connect: () => void
	rontodsr: bigint | undefined
	attodaiSupply: bigint | undefined
	attodaiPerDaiHrd: undefined | { value: bigint, timeSeconds: number }
	attodaiSavingsSupply: undefined | { value: bigint, timeSeconds: number }
	ethereumBrowser: boolean,
	account: undefined | 'connecting' | {
		readonly address: bigint
		readonly approveDaiHrdToSpendDai: () => void
		readonly depositIntoDaiHrd: (attodai: bigint) => void
		readonly withdrawIntoDai: (attodaiHrd: bigint) => void
		readonly sendDai: (recipient: bigint, attodai: bigint) => Promise<void>
		readonly sendDaiHrd: (recipient: bigint, attodaiHrd: bigint) => Promise<void>
		attodaiHrdBalance: bigint
		attodaiBalance: bigint
		depositState: 'querying' | 'not-approved' | 'approving' | 'approved' | 'depositing'
		withdrawState: 'idle' | 'withdrawing'
	}
}

export function App(model: Readonly<AppModel>) {
	const [tipContent, setTipContent] = React.useState<string | JSX.Element | undefined>(undefined)
	return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px', height: 'calc(100vh - 100px)' }}>
		<header className='header'>
			<svg width="115" height="23" viewBox="0 0 115 23" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.4375 1.2H5.5255V10.776H6.2455L10.1815 6H13.8535L9.0055 11.472L12.1495 15.36H14.3815V18H10.4935L6.3655 13.032H5.5255V18H2.4055V3.84H0.4375V1.2ZM27.6441 16.728C27.4361 16.92 27.1641 17.112 26.8281 17.304C26.5081 17.48 26.1241 17.648 25.6761 17.808C25.2441 17.968 24.7641 18.096 24.2361 18.192C23.7081 18.288 23.1481 18.336 22.5561 18.336C21.5321 18.336 20.6121 18.192 19.7961 17.904C18.9961 17.616 18.3161 17.2 17.7561 16.656C17.1961 16.096 16.7641 15.432 16.4601 14.664C16.1721 13.88 16.0281 12.992 16.0281 12C16.0281 10.944 16.1961 10.024 16.5321 9.24C16.8681 8.44 17.3241 7.776 17.9001 7.248C18.4921 6.72 19.1801 6.328 19.9641 6.072C20.7481 5.8 21.5961 5.664 22.5081 5.664C23.1161 5.664 23.7401 5.744 24.3801 5.904C25.0361 6.064 25.6361 6.344 26.1801 6.744C26.7241 7.128 27.1641 7.648 27.5001 8.304C27.8521 8.96 28.0281 9.792 28.0281 10.8C28.0281 11.488 27.9481 12.232 27.7881 13.032H19.1481C19.1641 13.544 19.2681 13.976 19.4601 14.328C19.6681 14.68 19.9321 14.968 20.2521 15.192C20.5881 15.416 20.9641 15.584 21.3801 15.696C21.8121 15.792 22.2681 15.84 22.7481 15.84C23.7081 15.84 24.4921 15.728 25.1001 15.504C25.7241 15.28 26.2281 15.008 26.6121 14.688L27.6441 16.728ZM22.4601 8.16C22.0441 8.16 21.6521 8.216 21.2841 8.328C20.9161 8.44 20.5801 8.608 20.2761 8.832C19.9881 9.04 19.7481 9.304 19.5561 9.624C19.3641 9.944 19.2521 10.304 19.2201 10.704H25.1241C25.1241 9.92 24.9001 9.304 24.4521 8.856C24.0201 8.392 23.3561 8.16 22.4601 8.16ZM36.4428 14.616H37.3548L39.6828 6H42.8988L39.4908 16.824C39.1868 17.72 38.8908 18.536 38.6028 19.272C38.3148 20.024 37.9788 20.672 37.5948 21.216C37.2108 21.76 36.7548 22.176 36.2268 22.464C35.7148 22.768 35.0828 22.92 34.3308 22.92C33.9628 22.92 33.6108 22.872 33.2748 22.776C32.9548 22.68 32.6588 22.56 32.3867 22.416C32.1148 22.288 31.8748 22.144 31.6668 21.984C31.4588 21.84 31.2908 21.704 31.1628 21.576L32.7708 19.44C32.9788 19.616 33.2268 19.776 33.5148 19.92C33.8028 20.08 34.0748 20.16 34.3308 20.16C34.8108 20.16 35.1868 19.992 35.4588 19.656C35.7468 19.32 36.0188 18.768 36.2747 18H34.5708L29.5788 6H32.9628L36.4428 14.616ZM50.9534 1.2H55.9694V11.568C55.9694 12.768 56.0334 13.952 56.1614 15.12C56.1614 15.2 56.1694 15.28 56.1854 15.36H57.7214V18H53.8574L53.5454 16.464H53.4494C53.2894 16.752 53.0734 17.008 52.8014 17.232C52.5294 17.456 52.2254 17.656 51.8894 17.832C51.5534 17.992 51.1854 18.112 50.7854 18.192C50.3854 18.288 49.9854 18.336 49.5854 18.336C48.8334 18.336 48.1214 18.216 47.4494 17.976C46.7934 17.736 46.2174 17.368 45.7214 16.872C45.2254 16.36 44.8334 15.72 44.5454 14.952C44.2574 14.168 44.1134 13.248 44.1134 12.192C44.1134 11.168 44.2654 10.256 44.5694 9.456C44.8894 8.656 45.3214 7.984 45.8654 7.44C46.4254 6.88 47.0814 6.456 47.8334 6.168C48.5854 5.864 49.4094 5.712 50.3054 5.712C50.8014 5.712 51.2654 5.744 51.6974 5.808C52.1454 5.856 52.5294 5.944 52.8494 6.072V3.84H50.9534V1.2ZM50.3054 15.696C50.9134 15.696 51.4494 15.552 51.9134 15.264C52.3934 14.96 52.7054 14.528 52.8494 13.968V8.88C52.6254 8.704 52.3134 8.576 51.9134 8.496C51.5294 8.4 51.1214 8.352 50.6894 8.352C50.2574 8.352 49.8334 8.424 49.4174 8.568C49.0174 8.712 48.6574 8.944 48.3374 9.264C48.0334 9.568 47.7854 9.968 47.5934 10.464C47.4174 10.96 47.3294 11.568 47.3294 12.288C47.3294 13.312 47.5854 14.136 48.0974 14.76C48.6094 15.384 49.3454 15.696 50.3054 15.696ZM58.84 12C58.84 10.992 58.992 10.096 59.296 9.312C59.6 8.528 60.032 7.864 60.592 7.32C61.152 6.776 61.816 6.368 62.584 6.096C63.368 5.808 64.24 5.664 65.2 5.664C66.208 5.664 67.104 5.816 67.888 6.12C68.688 6.424 69.36 6.856 69.904 7.416C70.448 7.96 70.856 8.624 71.128 9.408C71.416 10.192 71.56 11.056 71.56 12C71.56 13.008 71.408 13.904 71.104 14.688C70.8 15.472 70.368 16.136 69.808 16.68C69.248 17.224 68.576 17.64 67.792 17.928C67.024 18.2 66.16 18.336 65.2 18.336C64.192 18.336 63.288 18.184 62.488 17.88C61.704 17.576 61.04 17.152 60.496 16.608C59.952 16.048 59.536 15.376 59.248 14.592C58.976 13.808 58.84 12.944 58.84 12ZM62.056 12C62.056 12.528 62.128 13.016 62.272 13.464C62.416 13.912 62.624 14.304 62.896 14.64C63.168 14.976 63.496 15.24 63.88 15.432C64.264 15.608 64.704 15.696 65.2 15.696C66.128 15.696 66.88 15.4 67.456 14.808C68.048 14.216 68.344 13.28 68.344 12C68.344 10.896 68.072 10.008 67.528 9.336C66.984 8.648 66.208 8.304 65.2 8.304C64.752 8.304 64.336 8.376 63.952 8.52C63.568 8.648 63.232 8.864 62.944 9.168C62.672 9.472 62.456 9.856 62.296 10.32C62.136 10.784 62.056 11.344 62.056 12ZM72.6786 6H76.8786L77.2386 7.584H77.3346C77.7026 7.072 78.2306 6.624 78.9186 6.24C79.6066 5.856 80.4306 5.664 81.3906 5.664C81.9826 5.664 82.5346 5.744 83.0466 5.904C83.5746 6.064 84.0226 6.328 84.3906 6.696C84.7586 7.064 85.0466 7.568 85.2546 8.208C85.4786 8.832 85.5906 9.608 85.5906 10.536V18H82.4706V11.184C82.4706 10.208 82.2466 9.504 81.7986 9.072C81.3666 8.64 80.8146 8.424 80.1426 8.424C79.5506 8.424 79.0066 8.6 78.5106 8.952C78.0306 9.288 77.7026 9.712 77.5266 10.224V18H74.4066V8.64H72.6786V6ZM88.1973 15.36H92.4213V8.64H88.1973V6H95.5413V15.36H99.9813V18H88.1973V15.36ZM91.8453 2.736C91.8453 2.24 92.0293 1.816 92.3973 1.464C92.7653 1.112 93.2773 0.935999 93.9333 0.935999C94.6053 0.935999 95.1413 1.112 95.5413 1.464C95.9413 1.816 96.1413 2.24 96.1413 2.736C96.1413 3.248 95.9413 3.672 95.5413 4.008C95.1413 4.328 94.6053 4.488 93.9333 4.488C93.2773 4.488 92.7653 4.328 92.3973 4.008C92.0293 3.672 91.8453 3.248 91.8453 2.736ZM106.236 11.808L102.06 6H105.78L108.492 10.008L111.324 6H114.708L110.604 11.76L114.948 18H111.324L108.276 13.584L105.18 18H101.772L106.236 11.808Z" fill="white"/>
			</svg>
		</header>
		{(model.rontodsr !== undefined && model.attodaiSupply !== undefined && model.attodaiSavingsSupply !== undefined && model.attodaiPerDaiHrd !== undefined)
			? <DaiWasted presentInfoTip={setTipContent} rontodsr={model.rontodsr} attodaiSupply={model.attodaiSupply} attodaiSavingsSupply={model.attodaiSavingsSupply} attodaiPerDaiHrd={model.attodaiPerDaiHrd} />
			: <div style={{ height: '200px' }}></div>
		}
		<div style={{ height: '15px', flexShrink: 0 }}></div>
		{!model.ethereumBrowser &&
			<GetMetaMask/>
		}
		{model.ethereumBrowser && !model.account &&
			<Connect style={{ flexShrink: 0 }} connect={model.connect}/>
		}
		{model.account === 'connecting' &&
			<SpinnerPanel/>
		}
		{model.account && model.account !== 'connecting' && <>
			<section style={{ display: 'grid', gridTemplateColumns: '300px 300px', gridTemplateRows: '200px', gap: '15px' }}>
				<DepositDai presentInfoTip={setTipContent} deposit={model.account.depositIntoDaiHrd} attodaiBalance={model.account.attodaiBalance} depositState={model.account.depositState} approveDaiHrdToSpendDai={model.account.approveDaiHrdToSpendDai} />
				{model.account.attodaiHrdBalance && <>
					<WithdrawDai presentInfoTip={setTipContent} withdraw={model.account.withdrawIntoDai} withdrawState={model.account.withdrawState} attodaiHrdBalance={model.account.attodaiHrdBalance} attodaiPerDaiHrd={model.attodaiPerDaiHrd} rontoDsr={model.rontodsr} />
					<SendDai sendDai={model.account.sendDai} attodaiHrdBalance={model.account.attodaiHrdBalance} attodaiPerDaiHrd={model.attodaiPerDaiHrd} rontoDsr={model.rontodsr} />
					<SendDaiHrd sendDaiHrd={model.account.sendDaiHrd} attodaiHrdBalance={model.account.attodaiHrdBalance} attodaiPerDaiHrd={model.attodaiPerDaiHrd} rontoDsr={model.rontodsr} />
				</>}
			</section>
		</>}
		<div style={{ height: '15px', flexShrink: 0 }}></div>
		<iframe style={{ width: '615px', minHeight: '768px', border: 'none', borderRadius: '4px' }} src='https://uniswap.exchange/swap?outputCurrency=0x9B869c2eaae08136C43d824EA75A2F376f1aA983'></iframe>
		<div style={{ flexGrow: 1 }}></div>
		<nav style={{ display: 'flex', flexDirection: 'row', padding: '15px' }}>
			<a href='https://discord.gg/b88nb2S'>
				<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.448 10.068C7.764 10.068 7.224 10.668 7.224 11.4C7.224 12.132 7.776 12.732 8.448 12.732C9.132 12.732 9.672 12.132 9.672 11.4C9.684 10.668 9.132 10.068 8.448 10.068ZM12.828 10.068C12.144 10.068 11.604 10.668 11.604 11.4C11.604 12.132 12.156 12.732 12.828 12.732C13.512 12.732 14.052 12.132 14.052 11.4C14.052 10.668 13.512 10.068 12.828 10.068Z" fill="white" fill-opacity="0.35"/>
					<path d="M18.66 0H2.58C1.224 0 0.119995 1.104 0.119995 2.472V18.696C0.119995 20.064 1.224 21.168 2.58 21.168H16.188L15.552 18.948L17.088 20.376L18.54 21.72L21.12 24V2.472C21.12 1.104 20.016 0 18.66 0ZM14.028 15.672C14.028 15.672 13.596 15.156 13.236 14.7C14.808 14.256 15.408 13.272 15.408 13.272C14.916 13.596 14.448 13.824 14.028 13.98C13.428 14.232 12.852 14.4 12.288 14.496C11.136 14.712 10.08 14.652 9.17999 14.484C8.49599 14.352 7.908 14.16 7.416 13.968C7.14 13.86 6.83999 13.728 6.54 13.56C6.50399 13.536 6.46799 13.524 6.43199 13.5C6.40799 13.488 6.39599 13.476 6.38399 13.464C6.16799 13.344 6.048 13.26 6.048 13.26C6.048 13.26 6.624 14.22 8.14799 14.676C7.788 15.132 7.34399 15.672 7.34399 15.672C4.69199 15.588 3.68399 13.848 3.68399 13.848C3.68399 9.984 5.41199 6.852 5.41199 6.852C7.13999 5.556 8.78399 5.592 8.78399 5.592L8.90399 5.736C6.74399 6.36 5.748 7.308 5.748 7.308C5.748 7.308 6.012 7.164 6.456 6.96C7.74 6.396 8.75999 6.24 9.17999 6.204C9.252 6.192 9.31199 6.18 9.38399 6.18C10.116 6.084 10.944 6.06 11.808 6.156C12.948 6.288 14.172 6.624 15.42 7.308C15.42 7.308 14.472 6.408 12.432 5.784L12.6 5.592C12.6 5.592 14.244 5.556 15.972 6.852C15.972 6.852 17.7 9.984 17.7 13.848C17.7 13.848 16.68 15.588 14.028 15.672Z" fill="white" fill-opacity="0.35"/>
				</svg>
			</a>
			<div style={{ width: '15px' }}></div>
			<a href='https://github.com/Keydonix/dai-hrd/'>
				<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M12.2002 0C5.4639 0 0 5.4639 0 12.2002C0 17.5893 3.51785 22.155 8.30812 23.8017C8.90691 23.8765 9.13145 23.5023 9.13145 23.2029C9.13145 22.9035 9.13145 22.155 9.13145 21.1071C5.76329 21.8556 5.01481 19.4605 5.01481 19.4605C4.49088 18.0384 3.66755 17.6641 3.66755 17.6641C2.54483 16.9156 3.7424 16.9156 3.7424 16.9156C4.93997 16.9905 5.6136 18.1881 5.6136 18.1881C6.73632 20.0593 8.45782 19.5353 9.13145 19.2359C9.2063 18.4126 9.58054 17.8887 9.87993 17.5893C7.1854 17.2899 4.34118 16.242 4.34118 11.5266C4.34118 10.1793 4.79027 9.13145 5.6136 8.23328C5.53875 8.00873 5.08966 6.73632 5.76329 5.08966C5.76329 5.08966 6.81116 4.79027 9.13145 6.36208C10.1045 6.06269 11.1523 5.98784 12.2002 5.98784C13.2481 5.98784 14.296 6.13753 15.269 6.36208C17.5893 4.79027 18.6371 5.08966 18.6371 5.08966C19.3108 6.73632 18.8617 8.00873 18.7868 8.30812C19.5353 9.13145 20.0593 10.2542 20.0593 11.6014C20.0593 16.3169 17.215 17.2899 14.5205 17.5893C14.9696 17.9635 15.3438 18.712 15.3438 19.8347C15.3438 21.4814 15.3438 22.7538 15.3438 23.2029C15.3438 23.5023 15.5684 23.8765 16.1672 23.8017C21.0323 22.155 24.4753 17.5893 24.4753 12.2002C24.4004 5.4639 18.9365 0 12.2002 0Z" fill="white" fill-opacity="0.35"/>
				</svg>
			</a>
			<div style={{ width: '15px' }}></div>
			<a href='https://twitter.com/Keydonix'>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M21 24H3C1.344 24 0 22.656 0 21V3C0 1.344 1.344 0 3 0H21C22.656 0 24 1.344 24 3V21C24 22.656 22.656 24 21 24ZM9.216 18.096C14.874 18.096 17.97 13.404 17.97 9.342C17.97 9.21 17.97 9.078 17.964 8.946C18.564 8.514 19.086 7.968 19.5 7.35C18.948 7.596 18.354 7.758 17.73 7.836C18.366 7.458 18.852 6.852 19.086 6.132C18.492 6.486 17.832 6.738 17.13 6.876C16.566 6.276 15.768 5.904 14.886 5.904C13.188 5.904 11.808 7.284 11.808 8.982C11.808 9.222 11.838 9.456 11.886 9.684C9.33 9.558 7.062 8.328 5.544 6.468C5.28 6.924 5.13 7.452 5.13 8.016C5.13 9.084 5.676 10.026 6.498 10.578C5.994 10.56 5.52 10.422 5.106 10.194C5.106 10.206 5.106 10.218 5.106 10.236C5.106 11.724 6.168 12.972 7.572 13.254C7.314 13.326 7.044 13.362 6.762 13.362C6.564 13.362 6.372 13.344 6.186 13.308C6.576 14.532 7.716 15.42 9.06 15.444C8.004 16.272 6.678 16.764 5.238 16.764C4.992 16.764 4.746 16.752 4.506 16.722C5.862 17.586 7.482 18.096 9.216 18.096Z" fill="white" fill-opacity="0.35"/>
				</svg>
			</a>
		</nav>
		{tipContent &&
			<Modal content={tipContent} onClose={() => setTipContent(undefined)}/>
		}
	</div>
}
