import { Multipart } from './../../../node_modules/fastify-multipart/index.d';
import fs from 'fs-extra'
import { v4 as uuid } from 'uuid'
import AppLogger from './logger.utils';
import GeneralError from '../error/general.errror';
import { parse } from 'csv-parse';

export type FileCategoryType = '/csv/' | '/icon/package/' | '/img/promo/'
export const FiletCategory = {
    CSV: "/csv/" as FileCategoryType,
    ICON: {
        PACKAGE: "/icon/package/" as FileCategoryType
    },
    IMG: {
        PROMO: "/img/promo/" as FileCategoryType
    }
}


class FileUtils {

    static async saveFile(file: Multipart, category: string): Promise<string | undefined> {
        return new Promise(async (res, rej) => {
            try {
                const ext = `.${file.filename.split('.')[1]}`
                const generatedName = `${uuid()}${ext}`
                const filePath = `${category}${generatedName}`
                const dest = `${process.env.ASSETS_PATH}${filePath}`
                const data = (await file.toBuffer()).toString()

                await fs.writeFile(dest, data)

                res(filePath)
            } catch (error: any) {
                AppLogger.writeError(error)
                rej(res)
            }
        })
    }

    static async readFile(filePath: string): Promise<Buffer> {
        return new Promise(async (res, rej) => {
            try {
                res(await fs.readFile(`${process.env.ASSETS_PATH}${filePath}`))
            } catch (error: any) {
                rej(error)
            }
        })
    }

    static async parseCsv<T>(file: Multipart): Promise<T[]> {
        return new Promise(async (res, rej) => {
            try {
                const filePath = await FileUtils.saveFile(file, FiletCategory.CSV)
                if (!filePath) {
                    rej(new GeneralError())
                }

                const bufferData = await FileUtils.readFile(filePath!)
                let i = 0
                const keys: string[] = []
                const csvDataList: T[] = []

                const parser = parse(bufferData.toString(), {
                    delimiter: ",",
                    trim: true
                })

                parser.on('readable', function () {
                    let arrayData
                    while ((arrayData = parser.read()) !== null) {
                        try {
                            if (i === 0) {
                                arrayData.forEach((key: string) => {
                                    keys.push(key.replace(/ /g, "_"))
                                })
                            } else {
                                const data: any = {}
                                arrayData.forEach((csvData: any, index: number) => {
                                    data[keys[index]] = csvData
                                })
                                csvDataList.push(data as T)
                            }
                        } catch (error: any) {
                            rej(error)
                        }
                        i += 1
                    }

                    res(csvDataList)
                })

            } catch (error: any) {
                rej(error)
            }
        })
    }
}

export default FileUtils