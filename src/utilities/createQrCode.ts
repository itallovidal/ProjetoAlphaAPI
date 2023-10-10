export async function createQrCode(id: string){
    const response = await fetch(`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://projeto-alpha-site.vercel.app/${id}`)

    return response.url
}