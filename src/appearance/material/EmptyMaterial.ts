import Material from './Material'

class EmptyMaterial extends Material {


    public constructor() {
        super("empty", null)
    }

    public create(): void {

    }

    public bind(): void {

    }

    public unbind(): void {

    }

    public destroy(): void {

    }


}

export default EmptyMaterial