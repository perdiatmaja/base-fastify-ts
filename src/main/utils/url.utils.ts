class UrlUtil {
    private static readonly MOBILE_PREFIX_REGEX = /^\/mobile/
    private static readonly ERP_PREFIX_REGEX = /^\/erp/

    static isMobile(path: string): boolean {
        return this.MOBILE_PREFIX_REGEX.exec(path.toLocaleLowerCase()) !== null
    }

    static isERP(path: string): boolean {
        return this.ERP_PREFIX_REGEX.exec(path.toLocaleLowerCase()) !== null
    }
}

export default UrlUtil