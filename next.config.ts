import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/u/**"
			}
		]
	}
}

export default nextConfig
