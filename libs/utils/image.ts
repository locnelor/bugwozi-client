


export const selectFile = (onChange: (file: File) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = () => {
        onChange(input.files[0])
    }
    input.click();
}
const imageSuffixs = ["jpg", "jpeg", "png"];
export const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, rejects) => {
        const name = file.name;
        const suffix = name.slice(name.lastIndexOf(".") + 1).toLowerCase();
        if (!imageSuffixs.some(e => e === suffix)) return rejects(`请选择${imageSuffixs.join(",")}类型的图片`);
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result.toString());
        }
        reader.readAsDataURL(file);
    })
}
export const fileToImage = (file: File) => {
    return new Promise<HTMLImageElement>((resolve) => {
        fileToBase64(file)
            .then((base64) => {
                const img = new Image();
                img.src = base64;
                img.onload = () => {
                    resolve(img);
                }
            })
    })
}