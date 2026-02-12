import type { NextConfig } from "next"

const nextConfig: NextConfig = {
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
